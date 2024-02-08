import express from "express";
import cors from "cors";
import userRouter from "./user/user.router";
import { Config } from "./config/development";
import accountRouter from "./account/account.router";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: Config.CLIENT_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(Config.API_BASE, userRouter);
app.use(Config.API_BASE, accountRouter);

export default app;