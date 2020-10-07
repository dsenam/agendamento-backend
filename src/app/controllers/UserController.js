import User from '../models/User';

class UserController {
    async store(req, res) {
        const userExists = await User.findOne({
            where: {
                login: req.body.login,
            },
        });

        if (userExists) {
            return res.status(400).json({ error: 'Usuário já existe' });
        }

        const { id, login } = await User.create(req.body);

        return res.json({
            id,
            login,
        });
    }
}

export default new UserController();
