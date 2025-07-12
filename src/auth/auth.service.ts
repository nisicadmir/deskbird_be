import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { comparePassword } from '../common/lib/hash.lib';
import { User } from '../database/entities/user.entity';
import { signJwt } from '../common/lib/jwt.lib';
import { IUserJwtPayload, UserResponseModel } from '../common/models/user.model';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}
  async signIn(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const jwtPayload: IUserJwtPayload = { id: user.id, email: user.email, role: user.role };
    const accessToken = signJwt(jwtPayload);

    return accessToken;
  }

  async me(userId: number): Promise<UserResponseModel> {
    const user: UserResponseModel | null = await this.userRepository.findOne({
      where: { id: userId },
      select: ['id', 'email', 'fullName', 'role', 'createdAt', 'updatedAt'],
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
