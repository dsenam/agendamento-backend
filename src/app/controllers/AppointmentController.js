import { startOfHour, parseISO, isBefore } from 'date-fns';
import Appointment from '../models/Appointment';

class AppointmentController {
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
}
export default new AppointmentController();
