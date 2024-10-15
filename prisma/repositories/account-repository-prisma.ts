import { PrismaClient } from "@prisma/client";
import { SaveAccountInput, SaveAccountOutput } from "../../src/resources/account/account-models";

export class AccountRepositoryPrisma {
    private readonly prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async findByUserId(userId: string): Promise<SaveAccountOutput[]> {
        return await this.prisma.account.findMany({
            where: { userId },
            select: {
                id: true,
                name: true,
            },
        });
    }

    async save(userId: string, input: SaveAccountInput): Promise<SaveAccountOutput> {
        return await this.prisma.account.create({
            data: {
                name: input.name,
                userId,
            },
            select: {
                id: true,
                name: true,
            },
        });
    }
}