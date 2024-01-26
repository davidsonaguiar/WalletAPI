import { Router } from "express";

import { UserRepositoryInMemory } from "./user.repository.in.memory";
import { UserServices } from "./user.services";
import { UserControllers } from "./user.controllers";
import { UserMiddleware } from "./user.middleware";

const userRouter: Router = Router();
const repository = new UserRepositoryInMemory();
const userServices = new UserServices(repository);
const userControllers = new UserControllers(userServices);
const userMiddleware = new UserMiddleware();

userRouter.post(
  "/register",
  userMiddleware.validateCreateInput,
  async (request, response) =>
    userControllers.handleCreateUser(request, response)
);

userRouter.post(
  "/login",
  userMiddleware.validateAuthenticateInput,
  async (request, response) =>
    userControllers.handleAuthentication(request, response)
);

export default userRouter;
