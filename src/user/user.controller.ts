import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Delete,
  Param,
  BadRequestException,
  Req,
} from '@nestjs/common';

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
  async create(@Body() userCreateDto: UserCreateDto): Promise<{ status: string; data: UserResponseModel }> {
    const userCreated = await this.userService.createUser(userCreateDto);
    return {
      status: 'ok',
      data: {
        id: userCreated.id,
        email: userCreated.email,
        role: userCreated.role,
        createdAt: userCreated.createdAt,
        updatedAt: userCreated.updatedAt,
      } as UserResponseModel,
    };
  }

  @Get('list')
  async list(): Promise<{ status: string; data: UserResponseModel[] }> {
    const users = await this.userService.findAll();
    return { status: 'ok', data: users };
  }

  @Delete(':id')
  @UseGuards(new RoleGuard([UserRole.ADMIN]))
  async delete(@Param('id') id: string, @Req() req): Promise<{ status: string }> {
    const authUserId = req.user.id;
    const parsedId = Number(id);
    if (authUserId === parsedId) {
      throw new BadRequestException('You cannot delete yourself.');
    }
    await this.userService.deleteUser(parsedId);
    return { status: 'ok' };
  }
}
