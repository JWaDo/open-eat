import sequelize from '../../lib/sequelize';
import User from './User';
import './hooks';

sequelize
  .sync({ alter: true })
  .then((result) => console.log("Sync OK"))
  .catch((result) => console.error("Sync KO"));


export default {
    sequelize,
    User,
};
  