import { startOfHour, parseISO, isBefore, format, subMinutes } from 'date-fns';
import Appointment from '../models/Appointment';

class AppointmentController {
    async index(req, res) {
        // listar todos os agendamentos *(criar regra para visualizar apenas dados de hoje)
        const appointments = await Appointment.findAll({
            where: {
                canceled_at: null,
            },
            order: ['date'],
        });

        return res.json(appointments);
    }

    async store(req, res) {
        const { date } = req.body;

        const hourStart = startOfHour(parseISO(date));

        // Checando horas vencidas
        if (isBefore(hourStart, new Date())) {
            return res.status(400).json({ error: 'Data vencida' });
        }

        // Busca o agendamento no horário especificado
        const appointment = await Appointment.findOne({
            where: {
                date: hourStart,
                canceled_at: null,
            },
        });

        if (appointment == null) {
            // Não existe, então cria o agendamento
            const appointment = await Appointment.create({
                user_id: req.userId,
                date,
                quantidade: 1,
            });
        } else if (appointment.quantidade < 6) {
            // Já existe e é válido, então atualiza a quantidade no banco
            appointment.quantidade += 1;
            await appointment.save();
        } else {
            // Possui quantidade >= 6, então retorna o erro
            return res.status(400).json({ error: 'Agendamento já preenchido' });
        }

        // Retorna o agendamento
        return res.json(appointment);
    }

    async delete(req, res) {
        const appointment = await Appointment.findByPk(req.params.id);

        const dateWithSub = subMinutes(appointment.date, 10);

        if (isBefore(dateWithSub, new Date())) {
            return res.status(401).json({
                error:
                    'Você só pode cancelar agendamento com 10 minutos de antecedência ',
            });
        }

        appointment.canceled_at = new Date();
        appointment.quantidade -= 1;
        await appointment.save();

        return res.json(appointment);
    }
}
export default new AppointmentController();
