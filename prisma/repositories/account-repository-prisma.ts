import { PrismaClient } from "@prisma/client";
import { SaveAccountInput, AccountWithoutUserId, UpdateAccountInput } from "../../src/resources/account/account-models";

export class AccountRepositoryPrisma {
    private readonly prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async save(input: SaveAccountInput): Promise<AccountWithoutUserId> {
        return await this.prisma.account.create({
            data: {
                name: input.name,
                userId: input.userId,
                balance: input.balance
            },
            select: {
                id: true,
                name: true,
                balance: true, 
            },
        });
    }

    async findById(accountId: string): Promise<AccountWithoutUserId | null> {
        return await this.prisma.account.findUnique({
            where: { id: accountId },
            select: {
                id: true,
                name: true,
                balance: true,
            },
        });
    }

    async findByUserId(userId: string): Promise<AccountWithoutUserId[]> {
        return await this.prisma.account.findMany({
            where: { userId },
            select: {
                id: true,
                name: true,
                balance: true,
            },
        });
    }

    async update(input: UpdateAccountInput): Promise<AccountWithoutUserId> {
        return await this.prisma.account.update({
            where: { id: input.id },
            data: { name: input.name },
            select: {
                id: true,
                name: true,
                balance: true,
            },
        });
    }

    async delete(accountId: string): Promise<void> {
        await this.prisma.account.delete({
            where: { id: accountId },
        });
    }
}
