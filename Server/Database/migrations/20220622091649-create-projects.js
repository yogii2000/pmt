'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('projects', {
      project_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      project_name: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      // project_id:{
      //   allowNull: false,
      //   type: Sequelize.STRING,
      //   unique: true
      // },
      start_date: {
        type: Sequelize.DATE
      },
      end_date: {
        type: Sequelize.DATE
      },
      commencement_date: {
        type: Sequelize.DATE
      },
      delivery_date: {
        type: Sequelize.DATE
      },
      budget: {
        type: Sequelize.BIGINT
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
    await queryInterface.dropTable('projects');
  }
};