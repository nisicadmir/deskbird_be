import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './models/sign-in.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @UsePipes(new ValidationPipe())
  async signIn(@Body() signInDto: SignInDto): Promise<{ status: string; data: { accessToken: string } }> {
    const accessToken = await this.authService.signIn(signInDto.email, signInDto.password);
    return { status: 'ok', data: { accessToken } };
  }
}
