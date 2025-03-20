'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employee_roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  employee_roles.init({
    empid: DataTypes.STRING,
    role_id: DataTypes.STRING,
    startdate: DataTypes.DATE,
    enddate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'employee_roles',
  });
  return employee_roles;
};