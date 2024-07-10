import * as Joi from 'joi';
import CreateClientDTO from './create-client.dto';
import {
  BadRequestException,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common';

export class CreateInvoiceDto {
  description: string;
  due_date: string;
  client: CreateClientDTO;
}
const createInvoiceSchema = Joi.object<CreateInvoiceDto>({
  due_date: Joi.string()
    .trim()
    .pattern(/^\d{2}-\d{2}-\d{4}$/)
    .required()
    .messages({
      'string.pattern.base': 'due date must be a valid format of DD-MM-YYYY',
      'string.required': 'due date is required',
      'string.not_empty': 'due date is required',
      'string.base': 'due date is required',
    }),
  description: Joi.string().trim().required().messages({
    'string.required': 'description is required',
    'string.not_empty': 'description is required',
    'string.base': 'description is required',
  }),
  client: Joi.object<CreateClientDTO>({
    email: Joi.string().trim().email().optional().messages({
      'string.email': 'Invalid email',
      'string.required': 'email is required',
      'string.not_empty': 'email is required',
      'string.base': 'email is required',
    }),
    first_name: Joi.string().trim().required().messages({
      'string.required': 'first name is required',
      'string.not_empty': 'first name is required',
      'string.base': 'first name is required',
    }),
    last_name: Joi.string().trim().required().messages({
      'string.required': 'last name is required',
      'string.not_empty': 'last name is required',
      'string.base': 'last name is required',
    }),
    phone_number: Joi.string().trim().optional().messages({
      'string.required': 'phone number is required',
      'string.not_empty': 'phone number is required',
      'string.base': 'phone number is required',
    }),
  }),
}).options({
  abortEarly: false,
});

export class CreateInvoiceValidationPipe implements PipeTransform {
  public transform(value: CreateInvoiceDto): CreateInvoiceDto {
    const result = createInvoiceSchema.validate(value);
    if (result.error) {
      const errorMessage = result.error.details[0]?.message;
      if (!errorMessage)
        throw new UnprocessableEntityException('Something went wrong');
      throw new BadRequestException(errorMessage);
    }
    return value;
  }
}
