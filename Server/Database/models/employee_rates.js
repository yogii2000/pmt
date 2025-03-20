'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employee_rates extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  employee_rates.init({
    rate: DataTypes.INTEGER,
    currency: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'employee_rates',
  });
  return employee_rates;
};