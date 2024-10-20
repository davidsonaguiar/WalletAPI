import { NextFunction, Request, Response } from "express";
import { CategoryService } from "./category-service";

export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    async save(req: Request, res: Response, next: NextFunction) {
        try {
            const user = res.locals.user;
            const body = req.body;
            const categorySaved = await this.categoryService.save({
                name: body.name,
                type: body.type,
                userId: user.id,
            });
            res.status(201).json(categorySaved);
        } catch (error) {
            next(error);
        }
    }

    async getAll(_: Request, res: Response, next: NextFunction) {
        try {
            const user = res.locals.user;
            const categories = await this.categoryService.findAll(user.id);
            res.status(200).json(categories);
        }
        catch(error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const user = res.locals.user;
            const body = req.body;
            const categoryId = req.params.id;
            const categoryUpdated = await this.categoryService.update({
                id: Number(categoryId),
                name: body.name,
                type: body.type,
                userId: user.id
            });
            res.status(200).json(categoryUpdated);
        } catch (error) {
            next(error);
        }
    }
}
