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

    async update(req, res) {
        const { login, oldPassword } = req.body;

        const user = await User.findByPk(req.userId);

        if (login !== user.login) {
            const userExists = await User.findOne({ where: { login } });

            if (userExists) {
                return res.status(400).json({ error: 'Usuário já existe' });
            }
        }

        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            return res.status(401).json({ error: 'Password does not match' });
        }

        const { id } = await user.update(req.body);

        return res.json({ id, login });
    }
}

export default new UserController();
