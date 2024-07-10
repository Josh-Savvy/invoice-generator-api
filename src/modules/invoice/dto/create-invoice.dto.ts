import * as Joi from 'joi';
import CreateClientDTO from './create-client.dto';
import {
  BadRequestException,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  clientObjectSchema,
  futureDateSchema,
} from 'src/lib/validation/schema';

export class CreateInvoiceDto {
  description: string;
  due_date: string;
  client: CreateClientDTO;
}
const createInvoiceSchema = Joi.object<CreateInvoiceDto>({
  due_date: futureDateSchema.required(),
  description: Joi.string().trim().required().messages({
    'string.required': 'description is required',
    'string.not_empty': 'description is required',
    'string.base': 'description is required',
  }),
  client: clientObjectSchema.required(),
}).options({ abortEarly: false });

export class CreateInvoiceValidationPipe implements PipeTransform {
  public transform(value: CreateInvoiceDto): CreateInvoiceDto {
    const result = createInvoiceSchema.validate(value);
    if (result.error) {
      const errorMessage = result.error.details[0]?.message;
      if (!errorMessage)
        throw new UnprocessableEntityException('Something went wrong');
      throw new BadRequestException(errorMessage.split('"').join(''));
    }
    return value;
  }
}
