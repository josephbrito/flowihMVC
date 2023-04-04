import { sequelize } from "../connect";
import { DataTypes } from "sequelize";
import { Post } from "./Post";

export const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  username: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasMany(Post, {
  constraints: true,
  foreignKey: "userid",
});
