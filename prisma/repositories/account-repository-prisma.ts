import { PrismaClient } from "@prisma/client";
import { SaveAccountInput, SaveAccountOutput } from "../../src/resources/account/account-models";

export class AccountRepositoryPrisma {
    private readonly prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
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

    async findById(accountId: string): Promise<SaveAccountOutput | null> {
        return await this.prisma.account.findUnique({
            where: { id: accountId },
            select: {
                id: true,
                name: true,
            },
        });
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

    async update(accountId: string, input: SaveAccountInput): Promise<SaveAccountOutput> {
        return await this.prisma.account.update({
            where: { id: accountId },
            data: { name: input.name },
            select: {
                id: true,
                name: true,
            },
        })
    }

    async delete(accountId: string): Promise<void> {
        await this.prisma.account.delete({
            where: { id: accountId },
        });
    }
}
