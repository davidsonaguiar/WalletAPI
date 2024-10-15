import { UserService } from './user-services';
import { UserController } from "./user-controllers";
import { Router } from "express";
import { UserRepositoryPrisma } from '../../../prisma/repositories/user-repository-prisma';
import { prisma } from '../../../prisma/prisma';
import { PasswordEncrypter } from '../../auth/password-encrypter';
import { TokenService } from '../../auth/token-service';


const userRouter = Router();
const URL_BASE = "/users";

const userRepository = new UserRepositoryPrisma(prisma);
const tokenService = new PasswordEncrypter();
const jwtService = new TokenService();
const userService = new UserService(userRepository, tokenService, jwtService);
const userController = new UserController(userService);


userRouter.post(`${URL_BASE}/register`, async (req, res, next) => {
    await userController.register(req, res, next);
});

userRouter.post(`${URL_BASE}/login`, async (req, res, next) => {
    await userController.login(req, res, next);
});

export { userRouter };
