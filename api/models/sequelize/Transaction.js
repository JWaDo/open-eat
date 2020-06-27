import sequelize from '../../lib/sequelize';
import { DataTypes, Model } from 'sequelize';

class Transaction extends Model {}

Transaction.init({
    isOperating: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    basket: {
        type: DataTypes.STRING, 
        get: function() {
            return JSON.parse(this.getDataValue('basket'));
        }, 
        set: function(val) {
            return this.setDataValue('basket', JSON.stringify(val));
        },
        allowNull: false,
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    currency: {
        type: DataTypes.ENUM(["EUR", "USD", "GBP", "CAD", "AUD"]),
        allowNull: false,
    }},
    {
        sequelize,
        modelName: "Transaction",
        paranoid: true,
    }    
);

export default Transaction;