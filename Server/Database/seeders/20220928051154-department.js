'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.bulkInsert('departments', [{
       department: 'IT',
       added_on: new Date()
     }], {});
  
  },

  async down (queryInterface, Sequelize) {
 
     await queryInterface.bulkDelete('departments', null, {});
 
  }
};
