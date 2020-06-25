import sequelize from '../../lib/sequelize';
import { DataTypes, Model } from 'sequelize';

class Transaction extends Model {}

Transaction.init({
    state: {
        type: DataTypes.ENUM(["WAITING", "CANCELLATION", "COMPLETED", "REFUNDED"]),
        allowNull: false,
    },
    basket: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    currency: {
        type: DataTypes.ENUM(["EURO", "DOLLARS", "LIVRES"]),
        allowNull: false,
    }},
    {
        sequelize,
        modelName: "Transaction",
        paranoid: true,
    }    
);

export default Transaction;