import { Router } from "express";

import userRepository from "./user.repository.in.memory";
import { UserServices } from "./user.services";
import { UserControllers } from "./user.controllers";
import { UserMiddleware } from "./user.middleware";

const userRouter: Router = Router();
const userServices = new UserServices(userRepository);
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
