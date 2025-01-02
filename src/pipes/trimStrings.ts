import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class TrimPipe implements PipeTransform {
  ignoreKeys: string[] = [];

  constructor(ignoreKeys: string[]) {
    this.ignoreKeys = ignoreKeys;
  }

  private isObj(obj: IObj): boolean {
    return typeof obj === 'object' && obj !== null;
  }

  // TRIM STRING VALUES
  private trim(values) {
    Object.keys(values).forEach((key) => {
      if (!this.ignoreKeys.includes(key)) {
        // VALIDATE IF THE KEY IS OBJ
        if (this.isObj(values[key])) {
          values[key] = this.trim(values[key]);
        } else {
          // TRIM STRING VALUE
          if (typeof values[key] === 'string') {
            values[key] = values[key].trim();
          }
        }
      }
    });
    return values;
  }

  transform(values: IObj, metadata: ArgumentMetadata) {
    const { type } = metadata;
    if (this.isObj(values) && type === 'body') {
      return this.trim(values);
    }

    throw new BadRequestException('Validation failed');
  }
}
