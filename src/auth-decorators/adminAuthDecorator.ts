// Libraries
import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';

// Guard
import { RolesGuard, AuthGuard } from '../guards';

// Rol Decorator
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/role.enum';

// General Errors
import { responseGeneralError } from '../filters/errorsFilter/customThrowError';

// Merge all auth decorators for customer rol
export function CustomerAuth() {
  return applyDecorators(
    ApiSecurity('Ocp-Apim-Subscription-Key'),
    Roles(Role.ADMIN),
    UseGuards(AuthGuard, RolesGuard),
    ApiResponse(responseGeneralError), // Swagger Docs general error
    ApiBearerAuth('accessToken'),
  );
}
