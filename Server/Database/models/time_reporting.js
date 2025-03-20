'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class time_reporting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  time_reporting.init({
    project_id: DataTypes.INTEGER,
    activity_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    hours: DataTypes.TIME,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'time_reporting',
  });
  return time_reporting;
};