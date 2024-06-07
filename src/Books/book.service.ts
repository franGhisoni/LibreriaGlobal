import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { BookDTO, UpdateBookDTO, BookResponseDTO } from './book.dto';
import { Repository } from 'typeorm';
import { Author } from '../author/entities/author.entity';
import { Editorial } from '../editorial/entities/editorial.entity';
import { BookAuthor } from '../book-author/entities/book-author.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
    @InjectRepository(Editorial)
    private readonly editorialRepository: Repository<Editorial>,
    @InjectRepository(BookAuthor)
    private readonly bookAuthorRepository: Repository<BookAuthor>,
  ) {}

  async getAll(): Promise<BookResponseDTO[]> {
    const books = await this.bookRepository.find({ relations: ['editorial', 'bookAuthors', 'bookAuthors.author'] });
    return books.map(book => this.toResponseDTO(book));
  }

  async getById(id: number): Promise<BookResponseDTO> {
    const book = await this.bookRepository.findOne({ where: { id }, relations: ['editorial', 'bookAuthors', 'bookAuthors.author'] });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return this.toResponseDTO(book);
  }

  private toResponseDTO(book: Book): BookResponseDTO {
    return {
      id: book.id,
      titulo: book.titulo,
      editorial: book.editorial.nombre,
      // autores: book.bookAuthors.map(ba => `${ba.author.nombre} ${ba.author.apellido}`),
      autores: ["hola"],
      categoriaLiteraria: book.categoriaLiteraria,
      precio: book.precio,
      fechaLanzamiento: book.fechaLanzamiento,
      descripcion: book.descripcion,
    };
  }


  async create(createBookDTO: BookDTO): Promise<BookResponseDTO> {
    const { editorialId, authorIds, ...bookData } = createBookDTO;

    const editorial = await this.editorialRepository.findOneById(editorialId);
    if (!editorial) {
      throw new NotFoundException('Editorial not found');
    }

    const authors = await this.authorRepository.findByIds(authorIds);
    if (authors.length !== authorIds.length) {
      throw new NotFoundException('One or more authors not found');
    }

    const book = this.bookRepository.create({ ...bookData, editorial });
    await this.bookRepository.save(book);

    // Save BookAuthor relations
    for (const author of authors) {
      const bookAuthor = new BookAuthor();
      bookAuthor.book = book;
      bookAuthor.author = author;
      await this.bookAuthorRepository.save(bookAuthor);
    }

    return this.toResponseDTO(book);
  }

  async update(id: number, updateBookDTO: UpdateBookDTO): Promise<BookResponseDTO> {
    const { editorialId, authorIds, ...bookData } = updateBookDTO;

    const book = await this.bookRepository.findOne({ where: { id }, relations: ['editorial', 'bookAuthors', 'bookAuthors.author'] });
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    if (editorialId !== undefined) {
      const editorial = await this.editorialRepository.findOneById(editorialId);
      if (!editorial) {
        throw new NotFoundException('Editorial not found');
      }
      book.editorial = editorial;
    }

    if (authorIds !== undefined) {
      const authors = await this.authorRepository.findByIds(authorIds);
      if (authors.length !== authorIds.length) {
        throw new NotFoundException('One or more authors not found');
      }

      await this.bookAuthorRepository.delete({ bookId: book.id });
      for (const author of authors) {
        const bookAuthor = new BookAuthor();
        bookAuthor.book = book;
        bookAuthor.author = author;
        await this.bookAuthorRepository.save(bookAuthor);
      }
    }

    Object.assign(book, bookData);
    await this.bookRepository.save(book);

    return this.toResponseDTO(book);
  }

  async delete(id: number): Promise<void> {
    const result = await this.bookRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Book not found');
    }
  }
}
