import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { BookDTO, UpdateBookDTO, BookResponseDTO } from './book.dto';
import { Repository, In } from 'typeorm';
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

  async getAll(category): Promise<BookResponseDTO[]> {
    let findOptions = { relations: ['editorial', 'bookAuthors', 'bookAuthors.author'] };
    
   
    if (category) {
      findOptions['where'] = { categoriaLiteraria: category };
    }
  
    const books = await this.bookRepository.find(findOptions);
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
      autores: book.bookAuthors?.map(ba => `${ba.author.nombre} ${ba.author.apellido}`) ?? [],
      categoriaLiteraria: book.categoriaLiteraria,
      precio: book.precio,
      fechaLanzamiento: book.fechaLanzamiento,
      descripcion: book.descripcion,
    };
  }

  async create(createBookDTO: BookDTO): Promise<BookResponseDTO> {
    const { editorialId, authorIds, ...bookData } = createBookDTO;

    const editorial = await this.editorialRepository.findOne({ where: { id: editorialId } });
    if (!editorial) {
      throw new NotFoundException('Editorial not found');
    }

    const authors = await this.authorRepository.find({ where: { id: In(authorIds) } });
    if (authors.length !== authorIds.length) {
      throw new NotFoundException('One or more authors not found');
    }

    const book = this.bookRepository.create({ ...bookData, editorial });
    await this.bookRepository.save(book);

    for (const author of authors) {
      const bookAuthor = new BookAuthor();
      bookAuthor.book = book;
      bookAuthor.author = author;
      await this.bookAuthorRepository.save(bookAuthor);
    }

    const savedBook = await this.bookRepository.findOne({ where: { id: book.id }, relations: ['editorial', 'bookAuthors', 'bookAuthors.author'] });

    return this.toResponseDTO(savedBook);
  }

  async update(id: number, updateBookDTO: UpdateBookDTO): Promise<BookResponseDTO> {
    const { editorialId, authorIds, ...bookData } = updateBookDTO;

    let book = await this.bookRepository.findOne({ where: { id }, relations: ['editorial', 'bookAuthors', 'bookAuthors.author'] });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    console.log("book: ", book)

    if (editorialId !== undefined) {
      const editorial = await this.editorialRepository.findOne({ where: { id: editorialId } });
      console.log("editorial: ", editorial)
      if (!editorial) {
        throw new NotFoundException('Editorial not found');
      }
      book.editorial = editorial;
      console.log("book con editorial : ", book)

    }

    if (authorIds !== undefined) {
      const authors = await this.authorRepository.find({ where: { id: In(authorIds) } });
      console.log("authors: ", authors)

      if (authors.length !== authorIds.length) {
        throw new NotFoundException('One or more authors not found');
      }

      // Borrar relaciones BookAuthor existentes
      await this.bookAuthorRepository.delete({ bookId: book.id });
      console.log("deleted bookAuthor")
      // Crear nuevas relaciones BookAuthor
      for (const author of authors) {
        const bookAuthor = new BookAuthor();
        bookAuthor.book = book;
        bookAuthor.author = author;
        await this.bookAuthorRepository.save(bookAuthor);
        console.log("bookAuthor: ", bookAuthor)

      }

    
      book = await this.bookRepository.findOne({ where: { id }, relations: ['editorial', 'bookAuthors', 'bookAuthors.author'] });
      console.log("book anterior : ", book)

    }

    Object.assign(book, bookData);
    console.log("book final 2: ", book)
    try{
      await this.bookRepository.save(book);

    }catch(e){
      console.log(e)
      await this.bookRepository.update(id, book);

    }
    


   
    const updatedBook = await this.bookRepository.findOne({ where: { id: book.id }, relations: ['editorial', 'bookAuthors', 'bookAuthors.author'] });
    console.log("book final 3: ", updatedBook)

    return this.toResponseDTO(updatedBook);
  }

  async delete(id: number): Promise<void> {
    const result = await this.bookRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Book not found');
    }
  }
}
