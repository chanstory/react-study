import { Like, User } from "@/lib/generated/prisma";
import Link from "next/link";

interface ListProductProps {
  id: number;
  tweet: string;
  created_at: Date;
  user: User;
  Likes: Like[];
}

export default function ListTweet({
  id,
  tweet,
  created_at,
  user,
  Likes,
}: ListProductProps) {
  return (
    <Link href={`/products/${id}`} className="flex gap-5 inline-block w-full">
      <div className="flex flex-col gap-1 border-2 rounded-2xl p-1.5">
        <div className="flex justify-between">
          <span>{user.username}</span>
          <span className="text-sm text-neutral-500">
            {created_at.toISOString().substring(0, 10)}
          </span>
        </div>
        <div>
          <span className="text-lg">{tweet}</span>
        </div>
      </div>
    </Link>
  );
}