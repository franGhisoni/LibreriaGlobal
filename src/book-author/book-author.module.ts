import { Module } from '@nestjs/common';
import { BookAuthorService } from './book-author.service';
import { BookAuthorController } from './book-author.controller';

@Module({
  controllers: [BookAuthorController],
  providers: [BookAuthorService],
})
export class BookAuthorModule {}
