import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Query,
  Body,
  NotFoundException,
  HttpCode,
  HttpStatus,
  Patch,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BookService } from './book.service';
import { BookDTO, UpdateBookDTO } from './book.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getBooks() {
    return this.bookService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getBook(@Param('id') id: number) {
    const book = await this.bookService.getById(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async addBook(@Body() createBookDTO: BookDTO) {
    return this.bookService.create(createBookDTO);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async updateBook(@Param('id') id: number, @Body() updateBookDTO: UpdateBookDTO) {
    return this.bookService.update(id, updateBookDTO);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeBook(@Param('id') id: number) {
    await this.bookService.delete(id);
  }
}
