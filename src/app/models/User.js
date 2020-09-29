import Sequelize, { Model } from 'sequelize';

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                login: Sequelize.STRING,
                password: Sequelize.STRING,
            },
            { sequelize }
        );
    }
}

export default User;
