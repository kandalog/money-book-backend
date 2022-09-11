'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Money extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Money.init({
    userId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    date: DataTypes.INTEGER,
    message: DataTypes.STRING,
    bool: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Money',
  });
  return Money;
};