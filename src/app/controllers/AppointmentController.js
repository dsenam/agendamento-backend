import Appointment from '../models/Appointment';

class AppointmentController {
    async store(req, res) {
        const { date } = req.body;

        const appointment = await Appointment.create({
            user_id: req.userId,
            date,
        });

        return res.json(appointment);
    }
}

export default new AppointmentController();
