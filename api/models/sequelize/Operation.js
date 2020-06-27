import sequelize from '../../lib/sequelize';
import { DataTypes, Model } from 'sequelize';

class Operation extends Model {}

Operation.init({
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM(["WAITING", "CANCELED", "COMPLETED", "FAILED"]),
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