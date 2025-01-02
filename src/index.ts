// Auth decorators
import {
  CustomerAuth,
  CustomerPublicAuth,
  CustomerPublic,
  ManyRolesAuth,
  GeneralDecorators,
} from './auth-decorators';

// Guards
import {
  AuthGuard,
  RolesGuard,
  PublicAuthGuard,
  PublicRolesGuard,
} from './guards';

// Roles
import { Role } from './roles/role.enum';

// Interfaces
import { IRequest, ITokenUserData } from './interfaces';
// Filters
import { HttpExceptionFilter } from './filters';
import { customThrowError } from './filters/errorsFilter/customThrowError';

// Pipes
import { JoiValidationPipe } from './pipes';
import { JoiValidationPipeMicroservices } from './pipes/joiValidationPipeMicroservices';
import { TrimPipe } from './pipes/trimStrings';

export {
  CustomerAuth,
  CustomerPublicAuth,
  CustomerPublic,
  ManyRolesAuth,
  GeneralDecorators,
  AuthGuard,
  RolesGuard,
  PublicAuthGuard,
  PublicRolesGuard,
  Role,
  IRequest,
  ITokenUserData,
  HttpExceptionFilter,
  customThrowError,
  JoiValidationPipe,
  JoiValidationPipeMicroservices,
  TrimPipe,
};
