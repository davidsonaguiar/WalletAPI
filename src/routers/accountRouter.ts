import { Router } from "express";
import accountController from "../controllers/accountController";

const accountRounter = Router();

accountRounter.get("/accounts/:id", accountController.getAccount);
accountRounter.get("/accounts", accountController.getAccounts);
accountRounter.post("/accounts", accountController.addAccount);
accountRounter.put("/accounts/:id", accountController.editAccount);
accountRounter.delete("/accounts/:id", accountController.removeAccount);

export default accountRounter;