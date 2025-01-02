// Libraries
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

// Interfaces
import { IRequest } from '../interfaces';

// Types
import { Role } from '../roles/role.enum';

// Custom errors
import { customThrowError } from '../filters/errorsFilter/customThrowError';

@Injectable()
export class PublicRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Get metadata
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
      'api-roles',
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }

    // Validate user role
    const req = context.switchToHttp().getRequest() as IRequest;

    // Ignore for public services
    if (!req.user) {
      return true;
    }

    const validRol = requiredRoles.some((role) => req.user.rol === role);

    if (!validRol) {
      throw new ForbiddenException(customThrowError(null, 'FORBIDDEN'));
    }

    return true;
  }
}
