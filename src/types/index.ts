export interface Repository {
  id: string;
  name: string;
  path: string;
  commits?: Commit[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Commit {
  hash: string;
  subject: string;
  author: string;
  date: string;
}

export interface Branch {
  name: string;
  current: boolean;
}