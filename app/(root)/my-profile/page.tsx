import React from "react";
import BookList from "@/components/BookList";
import { getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { desc, eq } from "drizzle-orm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();

  if (!session?.user?.id) redirect("/sign-in");

  const borrowedBooks = (await db
    .select()
    .from(books)
    .where(eq(books.isBorrowed, true))
    .limit(10)
    .orderBy(desc(books.createdAt))) as Book[];

  return (
    <>
      <div className="flex flex-row items-center mb-12 gap-4">
        <Avatar className="w-20 h-20 place-content-center">
          <AvatarFallback className="bg-amber-100">
            {getInitials(session?.user?.name || "IN")}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <p className="uppercase font-bold text-white text-2xl">
            {session?.user?.name}
          </p>
          <p className="text-light-500 text-xs">{session?.user?.email}</p>
        </div>
      </div>
      <BookList title="Books Borrowed" books={borrowedBooks} />
    </>
  );
};
export default Page;
