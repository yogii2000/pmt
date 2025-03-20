
'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user_profile', [{
      name: 'yogesh',
      date_of_joining: '01-06-2019',
      email:'yogesh@gmail.com',
      password: 'Yogesh@12',
      gender:'Male',
      mobile_no:'9876543210',
      department:'IT',
      role_id:'DM150',
      added_on: new Date()
      }], {});
  },

  async down (queryInterface, Sequelize) {
   
      await queryInterface.bulkDelete('user_profile', null, {});
  }
};
