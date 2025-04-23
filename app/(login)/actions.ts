"use server";
import { INVALID_EMAIL_DOMAIN_MESSAGE, PASSWORD_MIN_LENGTH, PASSWORD_NOT_EXIST_MESSAGE, PASSWORD_REGEX, PASSWORD_REGEX_ERROR, USERNAME_MIN_LENGTH, VALID_EMAIL_DOMAIN } from "@/lib/constants";
import { z } from "zod";

const formSchema = z.object({
  email: z
    .string()
    .email()
    .refine((email) => email.endsWith(VALID_EMAIL_DOMAIN), {
      message: INVALID_EMAIL_DOMAIN_MESSAGE,
    }),
  userName: z
    .string()
    .min(USERNAME_MIN_LENGTH),
  password: z
    .string({
      required_error: PASSWORD_NOT_EXIST_MESSAGE,
    })
    .min(PASSWORD_MIN_LENGTH)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export const login = async (prevState: any, formData: FormData) => {
  const data = {
    userName: formData.get("userName"),
    email: formData.get("email"),
    password: formData.get("password")
  };

  const result = formSchema.safeParse(data);

  if (!result.success) {
    return result.error.flatten();
  }
};
