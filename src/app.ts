import express from "express";
import cors from "cors";
import userRouter from "./routers/userRouters";
import accountRounter from "./routers/accountRouters";
import transactionRouters from "./routers/transactionRouters";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "*",
  allowedHeaders: "*"
}));

app.use("/", userRouter);
app.use("/", accountRounter);
app.use("/", transactionRouters);

export default app;