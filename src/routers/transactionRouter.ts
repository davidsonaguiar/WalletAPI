import { Router } from "express";
import transactionController from "../controllers/transactionController";

const transactionRouter = Router();

transactionRouter.get("/transactions", transactionController.getTransactionsByUserId);
transactionRouter.get("/transactions/:id", transactionController.getTransactionById);
transactionRouter.post("/transactions", transactionController.addTransaction);
transactionRouter.put("/transactions/:id", transactionController.editTransaction);
transactionRouter.delete("/transactions/:id", transactionController.removeTransaction);

export default transactionRouter;