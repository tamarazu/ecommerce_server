'use strict';
const { hashingPassword } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Costumer extends Model{}
  Class.init({
    name: DataTypes.STRING,
    balance: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Email is required'
        },
        notEmpty: {
          msg: 'Email is required'
        },
        isEmail: {
          msg: 'Invalid email format (mail@mail.com)'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password is required'
        },
        notEmpty: {
          msg: 'Password is required'
        },
        len: {
          args: [6, 14],
          msg: 'Password length must between 6 and 14'
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user, options) => {
        let hash = hashingPassword(user.password)
        user.password = hash
      }
    }
  })

  Costumer.associate = function(models) {
    // associations can be defined here
    Costumer.belongsTo(models.Cart)
  };
  return Costumer;
};