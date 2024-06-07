import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Editorial } from '../editorial/entities/editorial.entity';
import { BookAuthor } from '../book-author/entities/book-author.entity';

@Entity('libros')
export class Book {
  @PrimaryGeneratedColumn({ name: 'PK_Libros_ID' })
  id: number;

  @ManyToOne(() => Editorial, (editorial) => editorial.books)
  @JoinColumn({ name: 'FK_Libros_Editorial_ID' })
  editorial: Editorial;

  @OneToMany(() => BookAuthor, (bookAuthor) => bookAuthor.book)
  bookAuthors: BookAuthor[];

  @Column({name:'Titulo'})
  titulo: string;

  @Column({ name: 'Categoria_Literaria' })
  categoriaLiteraria: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @Column({ name: 'Fecha_Lanzamiento' })
  fechaLanzamiento: Date;

  @Column('text')
  descripcion: string;
}
