export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export interface IUser {
  id: number;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export type IJwtPayload = Pick<IUser, 'id' | 'email' | 'role'>;
