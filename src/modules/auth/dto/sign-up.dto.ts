import * as Joi from 'joi';
import {
  emailValidationSchema,
  firstNameSchema,
  lastNameSchema,
  passwordSchema,
} from 'src/lib/validation/schema';
import ValidationPipe from 'src/lib/validation/validation.pipe';

export class SignUpDto {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export type SignInDto = Pick<SignUpDto, 'email' | 'password'>;

export const signupSchema = Joi.object<SignUpDto>({
  first_name: firstNameSchema.required(),
  last_name: lastNameSchema.required(),
  email: emailValidationSchema.required(),
  password: passwordSchema.required(),
}).options({ abortEarly: false, allowUnknown: true });

export class SignupValidationPipe extends ValidationPipe {
  constructor() {
    super(signupSchema);
  }
}
export class SigninValidationPipe extends ValidationPipe {
  constructor() {
    super(
      Joi.object({
        email: emailValidationSchema.required(),
        password: passwordSchema.required(),
      }).options({ abortEarly: false, allowUnknown: true }),
    );
  }
}
