// SWAGGER
import { ApiResponseOptions } from '@nestjs/swagger';

// Interfaces
import { IErrorData } from '../../interfaces/errors';

/**
 * Centralized function to return errors
 * @param additionalError additional Error data
 * @param errorCode Custom error code and get message from error code
 */
export const customThrowError = (
  additionalError: IErrorData,
  errorCode?: string,
  additionalData?: IObj,
): IErrorData => {
  // Default code

  // Get code error from additional error
  let code = errorCode || additionalError?.code;
  if (JSON.stringify(additionalError).indexOf('ERROR_WS') != -1) {
    code = 'ERROR_WS';
  }

  return {
    code,
    message: additionalError?.message,
    errorType: additionalError?.errorType,
    description: additionalError?.description,
    exceptionDetails: additionalError?.exceptionDetails,
    additionalData: additionalError?.additionalData || additionalData,
  };
};

// General Response Errors Swagger
export const responseGeneralError: ApiResponseOptions = {
  // SWAGGER RESPONSE
  status: 400,
  schema: {
    properties: {
      code: { type: 'string' },
      description: { type: 'string' },
      title: { type: 'string' },
      statusCode: { type: 'number' },
      path: { type: 'string' },
    },
    type: 'object',
  },
  description: 'General Response Error.',
};
