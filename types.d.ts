interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  description: string;
  coverColor: string;
  coverUrl: string;
  videoUrl: string;
  summary: string;
  createdAt?: Date | null;
  isBorrowed?: boolean;
}

interface BookCoverProps {
  className?: string;
  variant?: BookCoverVariant;
  coverColor: string;
  coverImage: string;
}

interface BookListProps {
  title: string;
  books: Book[];
  containerClassName?: string;
}

type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide";

interface AuthCredentials {
  fullName: string;
  email: string;
  universityId: number;
  universityCard: string;
  password: string;
}

interface FileUploadProps {
  type: "image" | "video";
  accept: string;
  placeholder: string;
  folder: string;
  variant: "dark" | "light";
  onFileChange: (filePath: string) => void;
  value?: string;
}

interface ColorPickerProps {
  value?: string;
  onPickerChange: (color: string) => void;
}

interface BookParams {
  title: string;
  author: string;
  genre: string;
  rating: number;
  coverUrl: string;
  coverColor: string;
  description: string;
  totalCopies: number;
  videoUrl: string;
  summary: string;
}

interface BorrowBookProps {
  userId: string;
  bookId: string;
  borrowingEligibility: {
    isEligible: boolean;
    message: string;
  };
}

interface BorrowBookParams {
  bookId: string;
  userId: string;
}
