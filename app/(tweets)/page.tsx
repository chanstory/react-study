import AddTweet from "@/components/add-tweet";
import TweetList from "@/components/tweet-list";
import db from "@/lib/db";

async function getTweets() {
  const tweets = await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      created_at: true,
      user: true,
      Likes: true
    },
    take: 5,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}

export type InitialTweets = Awaited<ReturnType<typeof getTweets>>;

export default async function Tweets() {
  const tweets = await getTweets();
  return (
    <div className="flex flex-col justify-center items-center w-lvw h-lvh bg-gray-100">
      <AddTweet />
      <TweetList initTweets={tweets} />
    </div>
  );
}