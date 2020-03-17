'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.addConstraint('Admins', [ 'email' ], {
       type: 'unique',
       name: 'constraint_unique'
     });
    },

  down: (queryInterface, Sequelize) => {
     return queryInterface.removeConstraint('Admins', 'constraint_unique', {});
    }
};
