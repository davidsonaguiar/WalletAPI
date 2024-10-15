import { number } from "zod"

export class ErrorStandard extends Error {
    private readonly status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }

    getStatus() {
        return this.status;
    }
}