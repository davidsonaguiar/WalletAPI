import { Router } from "express";
import categoriesController from "../controllers/categoryController";

const categoryRouter = Router();

categoryRouter.get("/categories", categoriesController.getCategories);

export default categoryRouter;