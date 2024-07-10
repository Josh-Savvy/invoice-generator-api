import * as Joi from 'joi';
import CreateClientDTO from './create-client.dto';
import { Injectable } from '@nestjs/common';
import {
  clientObjectSchema,
  futureDateSchema,
} from 'src/lib/validation/schema';
import ValidationPipe from 'src/lib/validation/validation.pipe';
import { CURRENCIES } from 'src/constants';
import { InvoiceItem } from '../entities/invoice.entity';

export class CreateInvoiceDto {
  description: string;
  due_date: string;
  currency: string;
  client: CreateClientDTO;
  billing_address?: string;
  billing_to?: string;
  notes?: string;
  items: InvoiceItem[];
  payment_method: PaymentMethod;
}

export type PaymentMethod = {
  account_number: string;
  account_name: string;
  bank: string;
};

export const invoiceItemSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.base': 'Name of item must be a string',
    'string.empty': 'Name of item is required',
    'any.required': 'Name of item is required',
  }),
  description: Joi.string().trim().required().messages({
    'string.base': 'Description of item must be a string',
    'string.empty': 'Description of item is required',
    'any.required': 'Description of item is required',
  }),
  quantity: Joi.number().integer().min(1).required().messages({
    'number.base': 'Quantity of item must be a number',
    'number.empty': 'Quantity of item is required',
    'number.integer': 'Quantity of item must be an integer',
    'number.min': 'Quantity of item must be at least 1',
    'any.required': 'Quantity of item is required',
  }),
  rate: Joi.number().required().messages({
    'number.base': 'Rate of item must be a number',
    'number.empty': 'Rate of item is required',
    'any.required': 'Rate of item is required',
  }),
}).options({ abortEarly: false });

export const paymentMethodSchema = Joi.object({
  account_number: Joi.string().trim().required().messages({
    'string.required': 'accountNumber is required',
    'string.trim': 'accountNumber is required',
    'string.base': 'accountNumber is required',
  }),
  account_name: Joi.string().trim().required().messages({
    'string.required': 'accountName is required',
    'string.trim': 'accountName is required',
    'string.base': 'accountName is required',
  }),
  bank: Joi.string().trim().required().messages({
    'string.required': 'bank is required',
    'string.trim': 'bank is required',
    'string.base': 'bank is required',
  }),
});

const createInvoiceSchema = Joi.object<CreateInvoiceDto>({
  due_date: futureDateSchema.required(),
  description: Joi.string().trim().required().messages({
    'string.required': 'description is required',
    'string.not_empty': 'description is required',
    'string.base': 'description is required',
  }),
  client: clientObjectSchema.required(),
  currency: Joi.valid(...CURRENCIES.map((val) => val.iso))
    .required()
    .messages({
      'string.required': 'Currency is required',
      'string.base': 'Currency is required',
      'string.not_empty': 'Currency is required',
      'any.valid': 'Currency not supported',
    }),
  billing_address: Joi.string().trim().optional().messages({
    'string.base': 'billing_address cannot be empty',
    'string.trim': 'billing_address cannot be empty',
    'string.not_empty': 'billing_address cannot be empty',
  }),
  billing_to: Joi.string().trim().optional().messages({
    'string.base': 'billing_to cannot be empty',
    'string.trim': 'billing_to cannot be empty',
    'string.not_empty': 'billing_to cannot be empty',
  }),
  notes: Joi.string().trim().optional().messages({
    'string.base': 'notes cannot be empty',
    'string.trim': 'notes cannot be empty',
    'string.not_empty': 'notes cannot be empty',
  }),
  items: Joi.array().min(1).items(invoiceItemSchema).required().messages({
    'array.base': 'Items must be an array',
    'array.empty': 'Items array cannot be empty',
    'any.required': 'Items are required',
    'any.min': 'At least one items is required',
  }),
  payment_method: paymentMethodSchema.required(),
}).options({ abortEarly: false });

@Injectable()
export class CreateInvoiceValidationPipe extends ValidationPipe {
  constructor() {
    super(createInvoiceSchema);
  }
}
