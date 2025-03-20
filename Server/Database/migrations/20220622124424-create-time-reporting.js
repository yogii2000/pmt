'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('time_reportings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      project_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
          model: 'projects',
          key: 'project_id'
        },
        unique :true
      },
      activity_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
          model: 'project_activities',
          key: 'id'
        },
        unique :true
      },
      empid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
          model: 'user_profile',
          key: 'empid'
        },
        unique :true
      },
      hours: {
        type: Sequelize.TIME
      },
      date: {
        type: Sequelize.DATE
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
      },
      is_approved: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      approved_on: {
        allowNull: false,
        type: Sequelize.DATE
      },
      approved_by: {
        allowNull: false,
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('time_reportings');
  }
};