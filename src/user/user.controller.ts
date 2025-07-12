import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';

import { AuthGuard } from '../common/guards/auth.guard';
import { RoleGuard } from '../common/guards/role.guard';
import { UserCreateDto, UserRole, UserResponseModel } from '../common/models/user.model';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @UsePipes(new ValidationPipe())
  @UseGuards(new RoleGuard([UserRole.ADMIN]))
  async create(@Body() userCreateDto: UserCreateDto): Promise<UserResponseModel> {
    const userCreated = await this.userService.createUser(userCreateDto);
    return {
      id: userCreated.id,
      email: userCreated.email,
      role: userCreated.role,
      createdAt: userCreated.createdAt,
      updatedAt: userCreated.updatedAt,
    } as UserResponseModel;
  }
}
