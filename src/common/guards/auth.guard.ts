import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { verifyJwt } from '../lib/jwt.lib';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const token = authHeader.split(' ')[1]; // Assuming Bearer token format
    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    try {
      const decoded = verifyJwt(token);
      (request as any).user = decoded; // Type assertion to bypass TypeScript error
      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
