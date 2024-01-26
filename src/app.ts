import express from "express";
import cors from "cors";
import userRouter from "./user/user.router";
import accountRounter from "./routers/accountRouter";
import transactionRouters from "./routers/transactionRouter";
import categoryRouter from "./routers/categoryRouter";
import metaRouter from "./routers/metaRouter";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "*",
  allowedHeaders: "*"
}));

app.use("/", userRouter);
// app.use("/", accountRounter);
// app.use("/", transactionRouters);
// app.use("/", categoryRouter);
// app.use("/", metaRouter);

export default app;