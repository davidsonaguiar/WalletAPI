import { PrismaClient, User } from "@prisma/client";
import { UserRepositoryProtocol } from "../../src/resources/user/protocols/user-repository-protocol";
import { SaveUserInput, SaveUserOutput } from "../../src/resources/user/user-models";

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
            },
        });
    }

    async findById(id: string): Promise<User | null> {
        return await this.prisma.user.findUnique({ where: { id } });
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.prisma.user.findUnique({ where: { email } });
    }

    async emailExists(email: string): Promise<boolean> {
        const user = await this.prisma.user.findFirst({ where: { email } });
        return !!user;
    }
}
