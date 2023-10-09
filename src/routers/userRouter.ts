import { Router } from "express";
import userController from "../controllers/userController";

const userRouter: Router = Router();

userRouter.get("/auth", userController.validateToken);
userRouter.post("/auth/register", userController.register);
userRouter.post("/auth/login", userController.login);

export default userRouter;