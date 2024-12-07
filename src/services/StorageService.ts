import { PrismaClient } from '@prisma/client';

export class StorageService {
  private prisma = new PrismaClient();

  async createRepo(name: string, path: string): Promise<Repository> {
    return this.prisma.repository.create({
      data: {
        name,
        path
      }
    });
  }

  async getRepo(id: string): Promise<Repository | null> {
    return this.prisma.repository.findUnique({
      where: { id }
    });
  }

  async listRepos(): Promise<Repository[]> {
    return this.prisma.repository.findMany();
  }

  async saveCommit(repoId: string, commit: Commit): Promise<void> {
    await this.prisma.commit.create({
      data: {
        hash: commit.hash,
        subject: commit.subject,
        repositoryId: repoId,
        authorName: commit.author,
        createdAt: new Date(commit.date)
      }
    });
  }
}