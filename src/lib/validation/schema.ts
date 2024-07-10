import * as Joi from 'joi';
import CreateClientDTO from 'src/modules/invoice/dto/create-client.dto';

export const emailValidationSchema = Joi.string().trim().email().messages({
  'string.trim': 'email is required',
  'string.required': 'email is required',
  'string.not_empty': 'email is required',
  'string.base': 'email is required',
  'string.email': 'Please enter a valid email',
});

export const lastNameSchema = Joi.string().trim().messages({
  'string.trim': 'last name is required',
  'string.required': 'last name is required',
  'string.not_empty': 'last name is required',
  'string.base': 'last name is required',
});

export const firstNameSchema = Joi.string().trim().required().messages({
  'string.trim': 'first name is required',
  'string.required': 'first name is required',
  'string.not_empty': 'first name is required',
  'string.base': 'first name is required',
});

export const passwordSchema = Joi.string().trim().min(6).messages({
  'string.trim': 'password is required',
  'string.required': 'password is required',
  'string.not_empty': 'password is required',
  'string.min': 'password must be at least 6 characters long',
  'string.base': 'password is required',
});

export const phoneNumberSchema = Joi.string().trim().optional().messages({
  'string.required': 'phone number is required',
  'string.not_empty': 'phone number is required',
  'string.base': 'phone number is required',
});

export const clientObjectSchema = Joi.object<CreateClientDTO>({
  email: emailValidationSchema.required(),
  first_name: firstNameSchema.optional(),
  last_name: lastNameSchema.optional(),
  phone_number: phoneNumberSchema.optional(),
});

export const futureDateSchema = Joi.string()
  .trim()
  .pattern(/^\d{2}-\d{2}-\d{4}$/)
  .required()
  .messages({
    'string.pattern.base': 'due date must be a valid format of DD-MM-YYYY',
    'string.required': 'due date is required',
    'string.not_empty': 'due date is required',
    'string.base': 'due date is required',
  });
