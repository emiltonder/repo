import { PrismaClient } from '@prisma/client';

export class RepositoryService {
  private prisma = new PrismaClient();

  async createRepo(name: string, description: string, userId: string) {
    return this.prisma.repository.create({
      data: {
        name,
        description,
        userId
      }
    });
  }

  async getRepo(id: string) {
    return this.prisma.repository.findUnique({
      where: { id }
    });
  }

  async listRepos(userId: string) {
    return this.prisma.repository.findMany({
      where: { userId }
    });
  }

  async createCommit(repoId: string, message: string, hash: string) {
    return this.prisma.commit.create({
      data: {
        message,
        hash,
        repositoryId: repoId
      }
    });
  }

  async getCommits(repoId: string) {
    return this.prisma.commit.findMany({
      where: { repositoryId: repoId },
      orderBy: { createdAt: 'desc' }
    });
  }
}