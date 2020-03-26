'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.addConstraint('Costumers', [ 'email' ], {
       type: 'unique',
       name: 'constraint_unique_costumer'
     });
    },

  down: (queryInterface, Sequelize) => {
     return queryInterface.removeConstraint('Costumers', 'constraint_unique_costumer', {});
    }
};
