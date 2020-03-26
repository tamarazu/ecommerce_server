'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Cart extends Model {}
  Cart.init({
    amount: DataTypes.INTEGER,
    CostumerId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER
  },
  {
    sequelize
  })

  Cart.associate = function(models) {
    // associations can be defined here
    Cart.belongsTo(models.Product)
    Cart.belongsTo(models.Costumer)
  };
  return Cart;
};