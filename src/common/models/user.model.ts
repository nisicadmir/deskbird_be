import { IsEmail, IsString, MinLength, IsEnum, MaxLength, IsNotEmpty } from 'class-validator';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export interface IUser {
  id: number;
  email: string;
  fullName: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export type IJwtPayload = Pick<IUser, 'id' | 'email' | 'role'>;

/**
 * Model for creating user in database
 */
export type UserCreateModel = Pick<IUser, 'email' | 'password' | 'role' | 'fullName'>;

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
  @MaxLength(100)
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(100)
  password: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;
}

// We will allow to update only fullName and role.
// Email should not be updatable.
export class UserUpdateDto {
  @IsNotEmpty()
  @MaxLength(100)
  fullName: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;
}

export type UserResponseModel = Pick<IUser, 'id' | 'email' | 'fullName' | 'role' | 'createdAt' | 'updatedAt'>;
export type UserListResponseModel = UserResponseModel[];
