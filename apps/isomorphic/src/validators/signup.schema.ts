import { z } from 'zod';
import { messages } from '@/config/messages';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from './common-rules';

// form zod validation schema
export const signUpSchema = z.object({
  firstName: z.string().min(1, { message: messages.firstNameRequired }),
  lastName: z.string().min(1, { message: messages.lastNameRequired }),
  email: validateEmail,
  password: validatePassword,
  password_confirmation: validateConfirmPassword,
  isAgreed: z.boolean().refine((value) => value === true, {
    message: messages.isAgreedRequired,
  }),
});

// generate form types from zod validation schema
export type SignUpSchema = z.infer<typeof signUpSchema>;
