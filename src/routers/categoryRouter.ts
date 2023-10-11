import { Router } from "express";
import categoriesController from "../controllers/categoryController";

const categoryRouter = Router();

categoryRouter.get("/categories", categoriesController.getCategories);
categoryRouter.post("/categories", categoriesController.addCategory);
categoryRouter.put("/categories/:id", categoriesController.editCategory);
categoryRouter.delete("/categories/:id", categoriesController.removeCategory);

export default categoryRouter;