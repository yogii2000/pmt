'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_profile', {
      empid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      date_of_joining:{
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique :true
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      // empid:{
      //   allowNull: false,
      //   type: Sequelize.STRING,
      //   unique: true
      // },
      gender:{
        allowNull: false,
        type: Sequelize.STRING
      },
      mobile_no:{
        allowNull: false,
        type: Sequelize.STRING
      },
      department:{
        allowNull: false,
        type: Sequelize.STRING
      },
      role_id:{
        allowNull: false,
        type: Sequelize.STRING,
        reference:{
          model:'roles',
          key:'role_id'
        }
      },
      added_on: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      added_by: {
        allowNull: true,
        type: Sequelize.STRING
      },
      changed_on: {
        allowNull: true,
        type: Sequelize.DATE
      },
      changed_by: {
        allowNull: true,
        type: Sequelize.STRING
      },
      deleted_on: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_profile');
  }
};