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

import { IsEmail, IsString, MinLength, IsEnum, MaxLength, IsNotEmpty } from 'class-validator';

export class UserCreateDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(100)
  password: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;
}
