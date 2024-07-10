import * as Joi from 'joi';
import {
  BadRequestException,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  emailValidationSchema,
  firstNameSchema,
  lastNameSchema,
  passwordSchema,
} from 'src/lib/validation/schema';

export class SignUpDto {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export const signupSchema = Joi.object<SignUpDto>({
  first_name: firstNameSchema.required(),
  last_name: lastNameSchema.required(),
  email: emailValidationSchema.required(),
  password: passwordSchema.required(),
}).options({ abortEarly: false, allowUnknown: true });

export class SignupValidationPipe implements PipeTransform {
  public transform(value: SignUpDto): SignUpDto {
    const result = signupSchema.validate(value);
    if (result.error) {
      const errorMessage = result.error.details[0]?.message;
      console.log({ errorMessage: result.error.details[0] });
      if (!errorMessage)
        throw new UnprocessableEntityException('Something went wrong');
      throw new BadRequestException(errorMessage.split('"').join(''));
    }
    return value;
  }
}
