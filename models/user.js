"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Money, {
        onDelete: "CASCADE",
      });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { notNull: { msg: "メールアドレスは必須です。" } },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notNull: { msg: "パスワードは必須です。" } },
      },
    },
    {
      sequelize,
      modelName: "User",
      indexes: [{ unique: true, fields: ["email"] }],
    }
  );
  return User;
};
