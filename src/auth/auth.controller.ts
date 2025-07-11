import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

interface ISignInDto {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() signInDto: ISignInDto): Promise<string> {
    return await this.authService.signIn(signInDto.email, signInDto.password);
  }
}
