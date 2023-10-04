import { Router } from "express";
import userControllers from "../controllers/userControllers";

const userRouter: Router = Router();

userRouter.post("/auth/register", userControllers.register);
userRouter.post("/auth/login", userControllers.login);

export default userRouter;