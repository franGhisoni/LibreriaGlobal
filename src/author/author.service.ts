import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto) {
    const newAuthor = this.authorRepository.create(createAuthorDto);
    await this.authorRepository.save(newAuthor);
    return newAuthor;
  }

  async findAll() {
    return await this.authorRepository.find();
  }

  async findOne(id: number) {
    return await this.authorRepository.findOne({where:{id}});
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    await this.authorRepository.update(id, updateAuthorDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const authorToRemove = await this.findOne(id);
    return await this.authorRepository.remove(authorToRemove);
  }
}
