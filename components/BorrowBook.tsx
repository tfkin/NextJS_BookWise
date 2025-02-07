"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { borrowBook } from "@/lib/actions/book";
import Link from "next/link";

const BorrowBook = ({
  userId,
  bookId,
  borrowingEligibility: { isEligible, message },
}: BorrowBookProps) => {
  const router = useRouter();
  const pathName = usePathname();
  const [borrowing, setBorrowing] = useState(false);

  const handleBorrowBook = async () => {
    if (!isEligible) {
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      return;
    }

    setBorrowing(true);

    try {
      const result = await borrowBook({ bookId, userId });

      if (result.success) {
        toast({
          title: "Success",
          description: "Book borrowed successfully",
        });

        router.refresh();
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while borrowing the book",
        variant: "destructive",
      });
    } finally {
      setBorrowing(false);
    }
  };

  return (
    <>
      {pathName === "/" ? (
        <Button className="book-overview_btn" asChild>
          <Link href={`/books/${bookId}`}>
            <Image src="/icons/book.svg" alt="book" width={20} height={20} />
            <p className="font-bebas-neue text-xl text-dark-100">
              Visit Book Information
            </p>
          </Link>
        </Button>
      ) : (
        <Button
          className="book-overview_btn"
          onClick={handleBorrowBook}
          disabled={borrowing}
        >
          <Image src="/icons/book.svg" alt="book" width={20} height={20} />
          <p className="font-bebas-neue text-xl text-dark-100">
            {borrowing ? "Borrowing ..." : "Borrow Book"}
          </p>
        </Button>
      )}
    </>
  );
};
export default BorrowBook;
