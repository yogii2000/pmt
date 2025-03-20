'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('assign_activity_employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      project_id: {
        allowNull: false,
        type: Sequelize.STRING,
        reference: {
          model: "projects",
          key: "project_id"
        }
      },
      emp_id: {
        allowNull: false,
        type: Sequelize.STRING,
        reference: {
          model: "user_profile",
          key: "empid"
        }
      },
      activity_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      added_on: {
        allowNull: false,
        type: Sequelize.DATE
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
    await queryInterface.dropTable('assign_activity_employees');
  }
};