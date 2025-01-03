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
      // Obtener datos del error
      const responseError = exception.getResponse() as IErrorData;

      // Eliminar datos sensibles
      delete request?.body?.password;

      console.error('responseError =>', responseError);

      if (responseError?.message && !responseError?.description) {
        responseError.description = responseError?.message;
      }

      // Construir datos del mensaje de error
      const errorMessageData: IErrorData = {
        code: responseError?.code || defaultErrorMessage.code,
        description:
          responseError?.description || defaultErrorMessage.description,
        title: responseError?.title || defaultErrorMessage.title,
        additionalData: responseError?.additionalData,
      };

      // Enviar la respuesta (solo una vez)
      response.status(status).json({
        ...errorMessageData,
        statusCode: status || 500,
        path: request.url,
      });
    } catch (errorFilter) {
      console.error('errorFilter =>', errorFilter);

      // Enviar respuesta en caso de error inesperado (solo una vez)
      if (!response.headersSent) {
        response.status(status).json({
          ...defaultErrorMessage,
          statusCode: status || 500,
          path: request.url,
        });
      }
    }
  }
}
