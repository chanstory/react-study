"use server";

import { TWEET_MAX_LENGTH } from "@/lib/constants";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { z } from "zod";

export async function getMoreTweets(page: number) {
  const products = await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      created_at: true,
      user: true,
      Likes: true
    },
    skip: page * 5,
    take: 5,
    orderBy: {
      created_at: "desc",
    },
  });
  return products;
}

const formSchema = z.object({
  tweet: z
    .string()
    .max(TWEET_MAX_LENGTH)
})

export const post = async (prevState: any, formData: FormData) => {
  const data = {
    tweet: formData.get("tweet")
  };

  const result = await formSchema.safeParseAsync(data);


  if (!result.success) {
    return result.error.flatten();
  }

  const session = await getSession();
  if (!session.id) {
    return {
      error: 'not authorization session',
    };
  }

  const tweet = await db.tweet.create({
    data: {
      tweet: result.data.tweet,
      userId: session.id
    },
    select: {
      id: true,
      tweet: true,
      created_at: true,
      user: true,
      Likes: true
    },
  });

  return tweet;
};