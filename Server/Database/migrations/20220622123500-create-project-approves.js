'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('project_approves', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      project_name: {
        allowNull: false,
        type: Sequelize.STRING,
        refrences: {
          model: 'projects',
          key: 'project_name'
        },
        unique: 'actions_unique'
      },
      empid:{
        allowNull: false,
        type: Sequelize.INTEGER,
        refrences: {
          model: 'user_profile',
          key: 'empid'
        },
        unique: 'actions_unique'
      },
      activity_name: {
        allowNull: false,
        type: Sequelize.STRING,
        refrences: {
          model: 'project_activities',
          key: 'activity_name'
        },
        unique: 'actions_unique'
      },
      comment:{
        type: Sequelize.STRING,
        allowNull: true
      },
      approved_on: {
        type: Sequelize.DATE,
      },
      approved_by: {
        type: Sequelize.STRING
      },
      no_of_hours:{
        type: Sequelize.INTEGER
      },
      start_date: {
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
      }
    },
    {
      uniqueKeys: {
          actions_unique: {
            fields: ['empid','activity_name','project_name']
          }
      }
  }
  );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('project_approves');
  }
};