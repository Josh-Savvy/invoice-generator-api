import * as Joi from 'joi';
import {
  PipeTransform,
  Injectable,
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';

@Injectable()
export default class ValidationPipe implements PipeTransform {
  constructor(private schema: Joi.Schema) {}

  transform<T>(value: T) {
    const { error, value: validatedValue } = this.schema.validate(value, {
      abortEarly: false,
    });
    if (error) {
      const errorMessage = error.details[0]?.message;
      if (!errorMessage)
        throw new UnprocessableEntityException('Something went wrong');
      throw new BadRequestException(errorMessage.split('"').join(''));
    }
    return validatedValue;
  }
}
