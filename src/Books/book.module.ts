import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Book } from './book.entity';
import { Author } from '../author/entities/author.entity';
import { Editorial } from '../editorial/entities/editorial.entity';
import { BookAuthor } from '../book-author/entities/book-author.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book, Author, Editorial, BookAuthor]),
  ],
  providers: [BookService],
  controllers: [BookController],
})
export class BookModule {}
