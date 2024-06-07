import { Injectable } from '@nestjs/common';
import { CreateBookAuthorDto } from './dto/create-book-author.dto';
import { UpdateBookAuthorDto } from './dto/update-book-author.dto';

@Injectable()
export class BookAuthorService {
  create(createBookAuthorDto: CreateBookAuthorDto) {
    return 'This action adds a new bookAuthor';
  }

  findAll() {
    return `This action returns all bookAuthor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookAuthor`;
  }

  update(id: number, updateBookAuthorDto: UpdateBookAuthorDto) {
    return `This action updates a #${id} bookAuthor`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookAuthor`;
  }
}
