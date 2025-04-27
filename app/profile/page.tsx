import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

export default async function Profile() {
  const user = await getUser();
  const logOut = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/");
  };
  return (
    <div className="flex justify-center items-center w-lvw h-lvh bg-gray-100">
      <div className="flex flex-col gap-2 w-72">
        <div className="h-10 w-full border-1 border-solid rounded-2xl bg-white p-2">
          Welcome! {user?.username}!
        </div>
        <form action={logOut}>
          <button className="primary-btn w-full h-10 border-1 border-solid rounded-2xl bg-gray-400 cursor-pointer">
            Log out
          </button>
        </form>
      </div>
    </div>
  );
}