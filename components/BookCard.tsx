import Link from "next/link";
import BookCover from "./BookCover";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { PgLineBuilder } from "drizzle-orm/pg-core";

const BookCard = ({
  id,
  title,
  genre,
  coverColor,
  coverUrl,
  isBorrowed,
}: Book) => {
  return (
    <li className={cn(isBorrowed && "xs:w-52 w-full")}>
      <div className={cn(isBorrowed && "w-full flex flex-col items-center")}>
        <Link href={`/books/${id}`}>
          <BookCover coverColor={coverColor} coverImage={coverUrl} />
        </Link>

        <div className={cn("mt-4", !isBorrowed && "xs:max-w-40 max-w-28")}>
          <p className="book-title">{title}</p>
          <p className="book-genre">{genre}</p>
        </div>

        {isBorrowed && (
          <div className="mt-3 w-full">
            <div className="book-loaned">
              <Image
                src="/icons/calendar.svg"
                alt="Calendar"
                width={18}
                height={18}
                className="object-contain"
              />
              <p className="text-light-100">11 days left to return.</p>
            </div>
            <Button className="book-btn text-dark-100" asChild>
              <Link href="/">Download Receipt</Link>
            </Button>
          </div>
        )}
      </div>
    </li>
  );
};

export default BookCard;
