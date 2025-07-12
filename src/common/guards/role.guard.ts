import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { UserRole } from '../models/user.model';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly allowedRoles: UserRole[] = []) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const user = (request as any).user; // Access the user object set by AuthGuard

    if (!user) {
      throw new UnauthorizedException('User data is missing from request');
    }

    const userRole: UserRole = user.role; // Assuming the role is stored in the JWT payload under 'role'

    // Admin can access any route
    if (userRole === UserRole.ADMIN) {
      return true;
    }

    // If no specific roles are required for the route, allow access to any authenticated user
    if (this.allowedRoles.length === 0) {
      return true;
    }

    // Check if the user's role is in the list of allowed roles for this route
    if (this.allowedRoles.includes(userRole)) {
      return true;
    }

    throw new UnauthorizedException('Insufficient permissions to access this route');
  }
}
