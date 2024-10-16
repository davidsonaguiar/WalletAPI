import { PrismaClient } from "@prisma/client";
import { UserRepositoryProtocol } from "../../src/resources/user/protocols/user-repository-protocol";
import { SaveUserInput, SaveUserOutput, User } from "../../src/resources/user/user-models";

export class UserRepositoryPrisma implements UserRepositoryProtocol {
    private readonly prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async save(input: SaveUserInput): Promise<SaveUserOutput> {
        return await this.prisma.user.create({
            data: input,
            select: {
                id: true,
                name: true,
                email: true,
                accounts: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
    }

    async findById(id: string): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: { id },
            include: {
                accounts: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: { email },
            include: {
                accounts: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
    }

    async emailExists(email: string): Promise<boolean> {
        const user = await this.prisma.user.findUnique({ where: { email } });
        return !!user;
    }
}
