import * as Joi from 'joi';
import CreateClientDTO from './create-client.dto';
import { Injectable } from '@nestjs/common';
import {
  clientObjectSchema,
  futureDateSchema,
} from 'src/lib/validation/schema';
import ValidationPipe from 'src/lib/validation/validation.pipe';

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

@Injectable()
export class CreateInvoiceValidationPipe extends ValidationPipe {
  constructor() {
    super(createInvoiceSchema);
  }
}
