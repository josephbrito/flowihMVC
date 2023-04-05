import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connect } from "./db/connect";
import userRouter from "./routes/user.router";
import postRouter from "./routes/post.router";
import adminRouter from "./routes/admin.router";

const app = express();

connect();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(json());
app.use(cookieParser());
app.use(userRouter);
app.use("/posts", postRouter);
app.use("/admin", adminRouter);

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
