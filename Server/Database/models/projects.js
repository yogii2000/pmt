'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  projects.init({
    name: DataTypes.STRING,
    pr_str_date: DataTypes.DATE,
    pr_end_date: DataTypes.DATE,
    actual_str_date: DataTypes.DATE,
    actual_end_date: DataTypes.DATE,
    budget - INR: DataTypes.INTEGER,
    cost: DataTypes.INTEGER,
    actual_hours: DataTypes.TIME,
    project_currency: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'projects',
  });
  return projects;
};