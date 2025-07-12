import { Body, Controller, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from 'src/common/models/user.model';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @UsePipes(new ValidationPipe())
  create(@Body() userCreateDto: UserCreateDto, @Req() request: Request): string {
    const user = (request as any).user;
    return 'success: ' + userCreateDto.email + ' ' + user.email;
  }
}
