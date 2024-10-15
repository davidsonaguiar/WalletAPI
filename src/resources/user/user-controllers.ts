import { NextFunction, Request, Response } from "express";

import { UserService } from "./user-services";

export class UserController {
    private readonly userServices: UserService;

    constructor(userService: UserService) {
        this.userServices = userService;
    }

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;
            const user = await this.userServices.save(body);
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }


    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;
            const user = await this.userServices.login(body);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
}
