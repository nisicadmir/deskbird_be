import { Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './models/sign-in.model';
import { AuthGuard } from 'common/guards/auth.guard';
import { IUserJwtPayload, UserResponseModel } from 'common/models/user.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @UsePipes(new ValidationPipe())
  async signIn(@Body() signInDto: SignInDto): Promise<{ status: string; data: { accessToken: string } }> {
    const accessToken = await this.authService.signIn(signInDto.email, signInDto.password);
    return { status: 'ok', data: { accessToken } };
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async me(@Req() req): Promise<{ status: string; data: { user: UserResponseModel } }> {
    const userReq = req.user as IUserJwtPayload;
    const user = await this.authService.me(userReq.id);
    return { status: 'ok', data: { user } };
  }
}
