import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Book } from '../../Books/book.entity';
import { Address } from './address.entity';

@Entity('editoriales')
export class Editorial {
  @PrimaryGeneratedColumn({ name: 'PK_Editorial_Id' })
  id: number;

  @Column({ length: 50 })
  nombre: string;

  @Column()
  cuit: number;

  @ManyToOne(() => Address, (address) => address.editorials)
  @JoinColumn({ name: 'FK_Editoriales_Direccion_Id' })
  address: Address;

  @OneToMany(() => Book, (book) => book.editorial)
  books: Book[];
}
