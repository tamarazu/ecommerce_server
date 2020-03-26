'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.addConstraint('Costumer', [ 'email' ], {
       type: 'unique',
       name: 'constraint_unique_costumers'
     });
    },

  down: (queryInterface, Sequelize) => {
     return queryInterface.removeConstraint('Costumer', 'constraint_unique_costumers', {});
    }
};
