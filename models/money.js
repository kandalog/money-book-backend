"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Money extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Money.belongsTo(models.User);
    }
  }
  Money.init(
    {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      amount: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notNull: { msg: "金額は必須です。" },
          isInt: { msg: "金額は半角数字で入力してください" },
        },
      },
      date: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: { notNull: { msg: "日付は必須です。" }, isInt: true },
      },
      message: DataTypes.STRING,
      bool: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Money",
    }
  );
  return Money;
};
