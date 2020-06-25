import sequelize from '../../lib/sequelize';
import { DataTypes, Model } from 'sequelize';

class Operation extends Model {}

Operation.init({
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM(["PAYMENT", "REFUND"])
    }},
    {
        sequelize,
        modelName: "Operation",
        paranoid: true,
    }
);

export default Operation;