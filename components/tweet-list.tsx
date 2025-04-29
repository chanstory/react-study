"use client";

import { useState } from "react";
import { getMoreTweets } from "../app/(tweets)/actions";
import { InitialTweets } from "@/app/(tweets)/page";
import ListTweet from "./list-tweet";

export default function TweetList({ initTweets }: { initTweets: InitialTweets }) {
  const [tweets, setTweets] = useState(initTweets);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const onLoadMoreClick = async () => {
    setIsLoading(true);
    const tweets = await getMoreTweets(page);
    setTweets((prev: any) => [...prev, ...tweets]);
    setPage(page + 1);
    setIsLoading(false);
  };

  return (
  <div className="flex flex-col justify-center gap-3">
    <div className="flex flex-col gap-1.5 w-80">
      {tweets.map((tweet) => (
        <ListTweet key={tweet.id} {...tweet} />
      ))}
    </div>
    <button
      onClick={onLoadMoreClick}
      disabled={isLoading}
      className="text-sm font-semibold bg-blue-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
    >
      {isLoading ? "로딩 중" : "Load more"}
    </button>
  </div>);
}