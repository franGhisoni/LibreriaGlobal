import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BookAuthor } from '../../book-author/entities/book-author.entity';

@Entity('autores')
export class Author {
  @PrimaryGeneratedColumn({ name: 'PK_Autor_ID' })
  id: number;

  @Column({ length: 50 })
  nombre: string;

  @Column({ length: 50 })
  apellido: string;

  @Column()
  dni: number;

  @Column({ length: 50 })
  nacionalidad: string;

  @OneToMany(() => BookAuthor, (bookAuthor) => bookAuthor.author)
  bookAuthors: BookAuthor[];
}
