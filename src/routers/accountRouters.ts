import { Router } from "express";
import accountControllers from "../controllers/accountControllers";

const accountRounter = Router();

accountRounter.get("/accounts/:id", accountControllers.getAccount);
accountRounter.get("/accounts", accountControllers.getAccounts);
accountRounter.post("/accounts", accountControllers.addAccount);
accountRounter.put("/accounts/:id", accountControllers.editAccount);
accountRounter.delete("/accounts/:id", accountControllers.removeAccount);

export default accountRounter;