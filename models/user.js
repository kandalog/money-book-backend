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
      User.hasMany(models.Money);
    }
  }
  User.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: { notNull: { msg: "名前は必須です。" } },
      },
      email: {
        allowNull: false,
        unique: { msg: "そのメーアドレスは既に使われています" },
        type: DataTypes.STRING,
        validate: { notNull: { msg: "メールアドレスは必須です。" } },
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: { notNull: { msg: "パスワードは必須です。" } },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
