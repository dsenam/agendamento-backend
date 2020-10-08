/* eslint-disable prettier/prettier */
import Sequelize, { Model } from 'sequelize';

class Appointment extends Model {
    static init(sequelize) {
        super.init(
            {
                date: Sequelize.DATE,
                canceled_at: Sequelize.DATE,

            },
            { sequelize }
        );

    }

    static associate(models) {
        this.belongsTo(models.User, {foreignKey: 'user_id', as: 'user'})
    }

    }


export default Appointment;
