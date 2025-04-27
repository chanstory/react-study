"use server";
import bcrypt from "bcrypt";
import { PASSWORD_MIN_LENGTH, PASSWORD_NOT_EXIST_MESSAGE, PASSWORD_REGEX, PASSWORD_REGEX_ERROR, USERNAME_MIN_LENGTH, VALID_EMAIL_DOMAIN } from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const checkUniqueEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return !Boolean(user);
};

const checkUniqueUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  return !Boolean(user);
};

const formSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .refine(
      checkUniqueEmail,
      "There is an account already registered with that email."
    ),
  username: z
    .string()
    .min(USERNAME_MIN_LENGTH)
    .refine(checkUniqueUsername, "This username is already taken"),
  password: z
    .string({
      required_error: PASSWORD_NOT_EXIST_MESSAGE,
    })
    .min(PASSWORD_MIN_LENGTH)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
  confirm_password: z
    .string({
      required_error: PASSWORD_NOT_EXIST_MESSAGE,
    })
    .min(PASSWORD_MIN_LENGTH)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
})
.refine(checkPasswords, {
  message: "Both passwords should be the same!",
  path: ["confirm_password"],
});

export const join = async (prevState: any, formData: FormData) => {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password")
  };

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  }

  const hashedPassword = await bcrypt.hash(result.data.password, 12);
  const user = await db.user.create({
    data: {
      username: result.data.username,
      email: result.data.email,
      password: hashedPassword,
    },
    select: {
      id: true,
    },
  });

  const cookie = await getIronSession(await cookies(), {
    cookieName: "delicious-karrot",
    password: process.env.COOKIE_PASSWORD!,
  });
  //@ts-ignore
  cookie.id = user.id;
  await cookie.save();
  redirect("/profile");
};
