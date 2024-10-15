import { TokenService } from './token-service';
import { NextFunction, Request, Response } from "express";
import { ErrorStandard } from "../error/error-standard";
import { JsonWebTokenError } from 'jsonwebtoken';


export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const bearerToken = req.headers.authorization;
        if (!bearerToken) throw new ErrorStandard("Unauthorized", 401);
        const token = bearerToken.split(" ")[1];
        const tokenService = new TokenService();
        const decoded = await tokenService.verify(token);
        res.locals.user = decoded;
        next();
    } catch (error) {
        if(error instanceof JsonWebTokenError) next(new ErrorStandard("Unauthorized", 401));
        next(error);
    }
}
