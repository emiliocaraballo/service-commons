import { PipeTransform, Injectable } from '@nestjs/common';
import { ObjectSchema } from 'joi';
import { RpcException } from '@nestjs/microservices';
// Custom errors
import { customThrowError } from '../filters/errorsFilter/customThrowError';

/**
 * Custom pipe for Joi validate schemas microservices
 */
@Injectable()
export class JoiValidationPipeMicroservices implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: TransformValues, meta: { type: string }) {
    if (meta.type !== 'body') return value;
    const { error } = this.schema.validate(value);

    if (error) {
      throw new RpcException(customThrowError(error, 'INVALID_PARAMS'));
    }
    return value;
  }
}
