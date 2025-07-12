import { IsEmail, IsString, MinLength, IsEnum, MaxLength, IsNotEmpty } from 'class-validator';

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

/**
 * Model for creating user in database
 */
export type UserCreateModel = Pick<IUser, 'email' | 'password' | 'role'>;

/**
 * DTO for creating a new user
 */
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

export type UserResponseModel = Pick<IUser, 'id' | 'email' | 'role' | 'createdAt' | 'updatedAt'>;
export type UserListResponseModel = UserResponseModel[];
