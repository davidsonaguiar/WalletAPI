import { NextFunction, Request, Response } from "express";
import { AccountService } from "./account-services";
import { UpdateAccountInput } from "./account-models";

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
            const account = await this.accountService.save({
                userId: user.id,
                name: body.name,
                balance: 0,
            });
            res.status(201).json(account);
        } catch (error) {
            next(error);
        }
    }

    async findAccounts(_: Request, res: Response, next: NextFunction) {
        try {
            const user = res.locals.user;
            const accounts = await this.accountService.findAccounts(user.id);
            res.status(200).json(accounts);
        } catch (error) {
            next(error);
        }
    }

    async findAccountById(req: Request, res: Response, next: NextFunction) {
        try {
            const accountId = req.params.id;
            const account = await this.accountService.findAccountById(accountId);
            res.status(200).json(account);
        } catch (error) {
            next(error);
        }
    }

    async updateAccount(req: Request, res: Response, next: NextFunction) {
        try {
            const accountId = req.params.id;
            const body = req.body;
            const user = res.locals.user;
            const account = await this.accountService.updateAccount(user.id, {
                id: accountId,
                name: body.name,
                balance: body.balance,
            });
            res.status(200).json(account);
        } catch (error) {
            next(error);
        }
    }

    async deleteAccount(req: Request, res: Response, next: NextFunction) {
        try {
            const accountId = req.params.id;
            const user = res.locals.user;
            await this.accountService.deleteAccount(user.id, accountId);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}
