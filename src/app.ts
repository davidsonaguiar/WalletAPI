import express from "express";
import cors from "cors";
import accountRounter from "./routers/accountRouter";
import transactionRouters from "./routers/transactionRouter";
import categoryRouter from "./routers/categoryRouter";
import metaRouter from "./routers/metaRouter";
import { userRouter } from "./resources/user/user-router";
import { errorHandler } from "./error/error-handler";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

app.use("/", userRouter);

// app.use("/", accountRounter);
// app.use("/", transactionRouters);
// app.use("/", categoryRouter);
// app.use("/", metaRouter);

app.use(errorHandler);

export default app;