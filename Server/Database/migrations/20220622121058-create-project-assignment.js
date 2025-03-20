'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('project_assignments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      employee_name:{
        type: Sequelize.STRING,
        allowNull:false
      },
      empid: {
         type: Sequelize.INTEGER,
         allowNull: false,
         references: {
          model : 'user_profile',
          key: 'empid'
         },
        //  unique: 'actions_unique'
      },
      project_id:{
        type: Sequelize.INTEGER,
         allowNull: false,
         references: {
          model : 'projects',
          key: 'project_id'
         },
        //  unique: 'actions_unique'
      },
      assigned:{
        allowNull:true,
        type: Sequelize.STRING
      },
      start_date: {
        allowNull: true,
        type: Sequelize.DATE
      },
      end_date: {
        allowNull: true,
        type: Sequelize.DATE
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
    }
    //   {
    //     uniqueKeys: {
    //         actions_unique: {
    //           fields: ['empid','project_id']
    //         }
    //     }
    // }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('project_assignments');
  }
};