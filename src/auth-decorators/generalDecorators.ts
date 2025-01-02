// Libraries
import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiResponseOptions, ApiSecurity } from '@nestjs/swagger';

// General Errors
import { responseGeneralError } from '../filters/errorsFilter/customThrowError';

// Merge all auth decorators for customer rol (This works for services that need to be public and authenticated.)
export function GeneralDecorators(customResponse: ApiResponseOptions) {
  return applyDecorators(
    ApiSecurity('Ocp-Apim-Subscription-Key'),
    ApiResponse(customResponse), // Swagger Docs
    ApiResponse(responseGeneralError), // Swagger Docs general error
  );
}
