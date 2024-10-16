import express from "express";
import cors from "cors";

import { userRouter } from "./resources/user/user-router";
import { errorHandler } from "./error/error-handler";
import { accountRouter } from "./resources/account/account-router";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ 
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE",
}));

app.use("/", userRouter);
app.use("/", accountRouter);


app.use(errorHandler);

export default app;