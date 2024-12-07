export class RepositoryManager {
  constructor(
    private gitService: GitService,
    private storageService: StorageService
  ) {}

  async createRepository(name: string, path: string): Promise<Repository> {
    await this.gitService.init(path);
    return this.storageService.createRepo(name, path);
  }

  async commit(repoPath: string, message: string): Promise<string> {
    const status = await this.gitService.status(repoPath);
    if (!status.modified.length) throw new Error('No changes to commit');
    
    await this.gitService.add(repoPath, '.');
    return this.gitService.commit(repoPath, message);
  }

  async getHistory(repoPath: string): Promise<Commit[]> {
    return this.gitService.log(repoPath);
  }

  async checkout(repoPath: string, ref: string): Promise<void> {
    await this.gitService.checkout(repoPath, ref);
  }

  async getBranches(repoPath: string): Promise<string[]> {
    return this.gitService.getBranches(repoPath);
  }

  async createBranch(repoPath: string, name: string): Promise<void> {
    await this.gitService.createBranch(repoPath, name);
  }
}