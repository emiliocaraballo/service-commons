import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from 'joi';

// Custom errors
import { customThrowError } from '../filters/errorsFilter/customThrowError';

/**
 * Custom pipe for Joi validate schemas
 */
@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: TransformValues, meta: { type: string }) {
    if (meta.type !== 'body') return value;
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException(customThrowError(error, 'INVALID_PARAMS'));
    }
    return value;
  }
}
