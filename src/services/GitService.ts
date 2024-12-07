import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export class GitService {
  async init(path: string): Promise<void> {
    await execAsync('git init', { cwd: path });
  }

  async status(path: string): Promise<{modified: string[]}> {
    const { stdout } = await execAsync('git status --porcelain', { cwd: path });
    const modified = stdout.split('\n')
      .filter(line => line.trim())
      .map(line => line.slice(3));
    return { modified };
  }

  async add(path: string, files: string): Promise<void> {
    await execAsync(`git add ${files}`, { cwd: path });
  }

  async commit(path: string, message: string): Promise<string> {
    const { stdout } = await execAsync(
      `git commit -m "${message}"`,
      { cwd: path }
    );
    return stdout.trim();
  }

  async log(path: string): Promise<Commit[]> {
    const { stdout } = await execAsync(
      'git log --pretty=format:"%H|%s|%ai|%an"',
      { cwd: path }
    );
    
    return stdout.split('\n').map(line => {
      const [hash, subject, date, author] = line.split('|');
      return { hash, subject, date, author };
    });
  }

  async checkout(path: string, ref: string): Promise<void> {
    await execAsync(`git checkout ${ref}`, { cwd: path });
  }

  async getBranches(path: string): Promise<string[]> {
    const { stdout } = await execAsync('git branch', { cwd: path });
    return stdout.split('\n')
      .map(b => b.trim())
      .filter(b => b)
      .map(b => b.replace('* ', ''));
  }

  async createBranch(path: string, name: string): Promise<void> {
    await execAsync(`git branch ${name}`, { cwd: path });
  }
}