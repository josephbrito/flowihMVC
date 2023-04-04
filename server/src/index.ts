import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes";
import { connect } from "./db/connect";

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
app.use(router);

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
