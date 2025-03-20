'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('project_activities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      activity_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique : 'actions_unique'
      },
      pjtname:{
        type: Sequelize.STRING,
        allowNull: false
      },
      project_id: {
         type: Sequelize.INTEGER,
         allowNull: false,
         references: {
          model : 'projects',
          key: 'project_id'
         },
         unique : 'actions_unique'
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
            fields: ['project_id','activity_name']
          }
      }
  }
  );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('project_activities');
  }
};