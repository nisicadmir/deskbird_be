import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConflictException, BadRequestException, InternalServerErrorException } from '@nestjs/common';

import { User } from '../database/entities/user.entity';
import { UserCreateDto, UserCreateModel, UserResponseModel, UserUpdateDto, UserUpdateModel } from '../common/models/user.model';
import { hashPassword } from '../common/lib/hash.lib';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async createUser(userCreateDto: UserCreateDto): Promise<User> {
    try {
      // Check if a user with the given email already exists
      const existingUser = await this.userRepository.findOne({ where: { email: userCreateDto.email } });
      if (existingUser) {
        throw new ConflictException('A user with this email already exists');
      }

      // Validate input data
      if (!userCreateDto.email || !userCreateDto.password) {
        throw new BadRequestException('Email and password are required');
      }

      // Create new user entity
      const newUser: UserCreateModel = {
        email: userCreateDto.email,
        password: await hashPassword(userCreateDto.password),
        role: userCreateDto.role || 'user', // Default to 'user' if role is not provided
        fullName: userCreateDto.fullName,
      };

      // Save the user to the database
      const user = this.userRepository.create(newUser);
      return await this.userRepository.save(user);
    } catch (error) {
      // Handle specific errors
      if (error instanceof ConflictException || error instanceof BadRequestException) {
        throw error; // Re-throw known exceptions
      }
      // Log unexpected errors for debugging
      console.error('Error creating user:', error);
      throw new InternalServerErrorException('Failed to create user due to an unexpected error');
    }
  }

  async updateUser(id: number, userUpdateDto: UserUpdateDto): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const updateModel: UserUpdateModel = {
      fullName: userUpdateDto.fullName,
      role: userUpdateDto.role,
    };
    await this.userRepository.update(id, updateModel);
  }

  async findAll(): Promise<UserResponseModel[]> {
    return this.userRepository.find({
      select: ['id', 'email', 'fullName', 'role', 'createdAt', 'updatedAt'],
      order: {
        createdAt: 'ASC',
      },
    });
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.delete({ id });
  }
}
