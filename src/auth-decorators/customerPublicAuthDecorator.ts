// Libraries
import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';

// Guard
import { PublicRolesGuard, PublicAuthGuard } from '../guards';

// Rol Decorator
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/role.enum';

// General Errors
import { responseGeneralError } from '../filters/errorsFilter/customThrowError';

// Merge all auth decorators for customer rol (This works for services that need to be public and authenticated.)
export function CustomerPublicAuth() {
  return applyDecorators(
    ApiSecurity('Ocp-Apim-Subscription-Key'),
    Roles(Role.CUSTOMER),
    UseGuards(PublicAuthGuard, PublicRolesGuard),
    ApiResponse(responseGeneralError), // Swagger Docs general error
    ApiBearerAuth('accessToken'),
  );
}
export function CustomerPublic() {
  return applyDecorators(
    ApiSecurity('Ocp-Apim-Subscription-Key'),
    UseGuards(PublicAuthGuard, PublicRolesGuard),
    ApiResponse(responseGeneralError), // Swagger Docs general error
    ApiBearerAuth('accessToken'),
  );
}
