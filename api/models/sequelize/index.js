import sequelize from '../../lib/sequelize';
import User from './User';
import Transaction from './Transaction';
import Operation from './Operation';
import './hooks';

// Relations
User.hasMany(Transaction);
Transaction.belongsTo(User);

Transaction.hasMany(Operation);
Operation.belongsTo(Transaction);


sequelize
  .sync({ alter: true })
  .then((result) => console.log("All models were synchronized successfully."))
  .catch((result) => console.error(result, "Error with models synchronization"));


export default {
    sequelize,
    User,
    Transaction,
    Operation,
};
  