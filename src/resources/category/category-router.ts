import { Router } from "express";
import { CategoryRepositoryPrisma } from "../../../prisma/repositories/category-repository-prisma";
import { prisma } from "../../../prisma/prisma";
import { CategoryService } from "./category-service";
import { UserRepositoryPrisma } from "../../../prisma/repositories/user-repository-prisma";
import { CategoryController } from "./category-controller";
import { authMiddleware } from "../../auth/auth-middleware";

const categoryRouter = Router();
const BASE_URL = "/categories";

const categoryRepository = new CategoryRepositoryPrisma(prisma);
const userRepository = new UserRepositoryPrisma(prisma);
const categoryService = new CategoryService(categoryRepository, userRepository);
const categoryController = new CategoryController(categoryService);

categoryRouter.post(BASE_URL, authMiddleware, async (req, resp, next) => {
    await categoryController.save(req, resp, next);
});

categoryRouter.get(BASE_URL, authMiddleware, async (req, resp, next) => {
    await categoryController.getAll(req, resp, next);
});

categoryRouter.put(`${BASE_URL}/:id`, authMiddleware, async (req, resp, next) => {
    await categoryController.update(req, resp, next);
});

export { categoryRouter };
