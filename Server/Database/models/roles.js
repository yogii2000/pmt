'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  roles.init({
    employee: DataTypes.STRING,
    admin: DataTypes.STRING,
    support: DataTypes.STRING,
    approver: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'roles',
  });
  return roles;
};