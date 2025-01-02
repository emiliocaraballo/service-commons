//  Libraries
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

// Interfaces
import { IErrorData } from '../../interfaces/errors';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private currentMicroservice = '';

  constructor(currentMicroservice?: string) {
    this.currentMicroservice = currentMicroservice;
  }

  async catch(exception: HttpException, host: ArgumentsHost) {
    // Default error message obj
    const defaultErrorMessage = {
      code: 'UNEXPECTED_ERROR',
      description: 'Ha ocurrido un error inesperado',
      title: 'Lo sentimos',
    };
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    try {
      // Get response error data
      const responseError = exception.getResponse() as IErrorData;

      // Remove password error
      delete request?.body?.password;

      //   getErrorLogger(this.currentMicroservice)?.error({
      //     ...responseError,
      //     message: responseError?.message,
      //     statusCode: status || 500,
      //     path: request.url,
      //     method: request.method,
      //     body: JSON.stringify(request.body),
      //     params: JSON.stringify(request.params),
      //     currentMicroservice: this.currentMicroservice,
      //     exception: JSON.stringify(exception),
      //   });
      console.error('responseError =>', responseError);

      // Get message from database

      // Return default error message
      if (responseError) {
        response.status(status).json({
          ...responseError,
          statusCode: status || 500,
          path: request.url,
        });
      }

      // SET data from errorMessage table
      const errorMessageData: IErrorData = {
        code: responseError?.code || defaultErrorMessage.code,
        description:
          responseError?.description || defaultErrorMessage.description,
        title: responseError?.title || defaultErrorMessage.title,
        additionalData: responseError?.additionalData,
      };

      response.status(status).json({
        ...errorMessageData,
        statusCode: status || 500,
        path: request.url,
      });
    } catch (errorFilter) {
      console.error('errorFilter =>', errorFilter);
      response.status(status).json({
        ...defaultErrorMessage,
        statusCode: status || 500,
        path: request.url,
      });
    }
  }
}
