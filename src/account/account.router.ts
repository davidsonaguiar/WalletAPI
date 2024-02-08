import { Router } from "express";

import { AccountServices } from './account.services';
import { AccountControllers } from "./account.controllers";
import accountReposiory from "./account.repository.in.memory";
import userRepository from "../user/user.repository.in.memory";

const accountRouter = Router();

const accountServices = new AccountServices(userRepository, accountReposiory);
const accountControllers = new AccountControllers(accountServices);

accountRouter.post("/accounts", async (request, response) => {
  await accountControllers.handleCreateAccount(request, response);
});

accountRouter.get("/accounts/:userEmail", async (request, response) => {
  await accountControllers.handleGetByUserEmail(request, response);
});

export default accountRouter;