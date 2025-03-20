'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('roles', [{
      role: 'Admin',
       role_id:'DM150',
       added_on : new Date()
     },
    {
      role: 'Employee',
      role_id: 'DM151',
      added_on : new Date()
    },
    {
      role: 'Approver',
      role_id: 'DM152',
      added_on : new Date()
    }
    ], {});

  },

  async down (queryInterface, Sequelize) {
 
     await queryInterface.bulkDelete('roles', null, {});
    
  }
};
