import { Request, Response, NextFunction } from "express";
import { ErrorStandard } from "./error-standard";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if(err instanceof ErrorStandard) {
        return res.status(err.getStatus()).json(err.message);
    }
    return res.status(500).json("Internal server error");
}