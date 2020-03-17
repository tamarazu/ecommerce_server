'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Product extends Model {
    static associate(models){

    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Name is required'
        }, 
        notEmpty: {
          msg: 'Name is required'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Image Url is required'
        }, 
        notEmpty: {
          msg: 'Image Url is required'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Price is required'
        }, 
        notEmpty: {
          msg: 'Price is required'
        },
        min: {
          args: [0],
          msg: 'Price must greater than 0'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Stock is required'
        }, 
        notEmpty: {
          msg: 'Stock is required'
        },
        isDecimal: {
          args: false,
          msg: 'Stock is not allowed with decimal value'
        }
      }
    }
  },
  {
    sequelize
  })

  return Product;
};