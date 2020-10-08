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

        // Checando disponibilidade do agendamento
        const checkAvailability = await Appointment.findOne({
            where: {
                date: hourStart,
                canceled_at: null,
            },
        });

        if (checkAvailability) {
            return res.status(400).json({ error: 'Agendamento já preenchido' });
        }

        // recuperando valor do campo quantidade

        const appointment = await Appointment.create({
            user_id: req.userId,
            date,
            quantidade: 1,
        });

        return res.json(appointment);
    }
}

export default new AppointmentController();
