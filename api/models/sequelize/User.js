import sequelize from '../../lib/sequelize';
import { DataTypes, Model } from 'sequelize';

// Generation du model
class User extends Model {}
User.init(
  {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "Invalid email.",
          },
        },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    businessSiret: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['admin', 'saler'],
        defaultValue: 'saler',
    },
    businessName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    confirmUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cancelUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    paranoid: true,
  }
);

export default User;