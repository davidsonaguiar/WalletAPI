import { Router } from "express";
import transactionControllers from "../controllers/transactionControllers";

const transactionRouters = Router();

transactionRouters.get("/transactions", transactionControllers.getTransactionsByUserId);
transactionRouters.get("/transactions/:id", transactionControllers.getTransactionById);
transactionRouters.post("/transactions", transactionControllers.addTransaction);

export default transactionRouters;