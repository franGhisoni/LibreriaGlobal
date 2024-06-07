import { Entity, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { Book } from '../../Books/book.entity';
import { Author } from '../../author/entities/author.entity';

@Entity('libros_autores')
export class BookAuthor {
  @PrimaryColumn({ name: 'FK_Libros_ID' })
  bookId: number;

  @PrimaryColumn({ name: 'FK_Autor_ID' })
  authorId: number;

  @ManyToOne(() => Book, (book) => book.bookAuthors, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'FK_Libros_ID' })
  book: Book;

  @ManyToOne(() => Author, (author) => author.bookAuthors, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'FK_Autor_ID' })
  author: Author;
}
