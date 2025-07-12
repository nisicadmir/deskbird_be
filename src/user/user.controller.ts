import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from 'src/common/models/user.model';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @UsePipes(new ValidationPipe())
  create(@Body() userCreateDto: UserCreateDto): string {
    return 'success: ' + userCreateDto.email;
  }
}
