import { startOfHour, parseISO, isBefore, subMinutes } from 'date-fns';
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

        // Busca os agendamentos no horário enviado
        const checkAppointments = await Appointment.findAll({
            where: {
                date: hourStart,
                canceled_at: null,
            },
        });

        if (checkAppointments.length >= 6) {
            return res
                .status(400)
                .json({ error: 'Todos os agendamentos foram preenchidos' });
        }

        const appointment = await Appointment.create({
            user_id: req.userId,
            date,
        });

        // Retorna o agendamento
        return res.json(appointment);
    }

    async delete(req, res) {
        const appointment = await Appointment.findByPk(req.params.id);

        if (appointment.user_id !== req.userId) {
            return res.status(401).json({
                error: 'Somente o dono do agendamento pode cancelar',
            });
        }

        const dateWithSub = subMinutes(appointment.date, 10);

        if (isBefore(dateWithSub, new Date())) {
            return res.status(401).json({
                error:
                    'Você só pode cancelar agendamento com até 10 minutos de antecedência ',
            });
        }

        appointment.canceled_at = new Date();
        await appointment.save();

        return res.json(appointment);
    }
}
export default new AppointmentController();
