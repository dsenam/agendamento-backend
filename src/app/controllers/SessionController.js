import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';
import User from '../models/User';

class SessionController {
    async store(req, res) {
        const { login, password } = req.body;
        const user = await User.findOne({ where: { login } });

        if (!user) {
            return res.status(401).json({ error: 'Usuário não localizado' });
        }

        if (!(await user.checkPassword(password))) {
            return res.status(401).json({ error: 'Senha não confere' });
        }

        const { id } = user;

        return res.json({
            user: {
                id,
                login,
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        });
    }
}

export default new SessionController();
