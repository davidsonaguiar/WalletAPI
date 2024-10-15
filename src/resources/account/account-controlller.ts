import { NextFunction, Request, Response } from "express";
import { AccountService } from "./account-services";


export class AccountController {
    private readonly accountService: AccountService;

    constructor(accountService: AccountService) {
        this.accountService = accountService;
    }

    async save(req: Request, res: Response, next: NextFunction) {
        try {
            const user = res.locals.user;
            console.log(user);
            const body = req.body;
            const account = await this.accountService.save(user.id, body);
            res.status(201).json(account);
        } catch (error) {
            next(error);
        }
    }
}
