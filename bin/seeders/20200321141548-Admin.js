'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return queryInterface.bulkInsert('Admins', [{
       name: 'admin',
       email: 'mail@mail.com',
       password: '$2b$10$V04sre5hjpVKYTN/mfpCTu35aBFpcys21umeNx66zIbHw1hrjpJaW'
     }], {});
    },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return queryInterface.bulkDelete('Admins', null, {});
  }
};
