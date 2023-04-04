import { Sequelize } from "sequelize";
export const sequelize = new Sequelize(
  "postgres://pnvfmvxm:0nR-QaNbaeKQ_SHtnapyp9-KNctkU-AL@babar.db.elephantsql.com/pnvfmvxm"
);
import { User } from "./Models/User";
import { Post } from "./Models/Post";

export async function connect() {
  try {
    await User.sync();
    await Post.sync();
    await sequelize.authenticate();
    console.log("Database connected!");
    return;
  } catch (error) {
    console.log(`Error to connect database: ${error}`);
    return;
  }
}
