'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Admin extends Model {
    static associate(models){

    }
  }
  
  Admin.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  },
  {
    sequelize
  })

  return Admin;
};