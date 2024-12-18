export interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  bio?: string;
  interests: string[];
  avatarUrl?: string;
  createdAt: Date;
}