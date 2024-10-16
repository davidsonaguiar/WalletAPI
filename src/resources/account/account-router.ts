import { Router } from "express";

import { prisma } from "../../../prisma/prisma";
import { AccountRepositoryPrisma } from "./../../../prisma/repositories/account-repository-prisma";
import { AccountService } from "./account-services";
import { AccountController } from "./account-controlller";
import { UserRepositoryPrisma } from "../../../prisma/repositories/user-repository-prisma";
import { authMiddleware } from "../../auth/auth-middleware";

const accountRouter = Router();
const URL_BASE = "/accounts";

const accountRepository = new AccountRepositoryPrisma(prisma);
const userRepository = new UserRepositoryPrisma(prisma);
const accountService = new AccountService(accountRepository, userRepository);
const accountController = new AccountController(accountService);

accountRouter.post(`${URL_BASE}`, authMiddleware, async (req, res, next) => {
    await accountController.save(req, res, next);
});

accountRouter.get(`${URL_BASE}/:id`, authMiddleware, async (req, res, next) => {
    await accountController.findAccountById(req, res, next);
});

accountRouter.get(`${URL_BASE}`, authMiddleware, async (req, res, next) => {
    await accountController.findAccounts(req, res, next);
});

accountRouter.put(`${URL_BASE}/:id`, authMiddleware, async (req, res, next) => {
    await accountController.updateAccount(req, res, next);
});

accountRouter.delete(`${URL_BASE}/:id`, authMiddleware, async (req, res, next) => {
    await accountController.deleteAccount(req, res, next);
});

export { accountRouter };
