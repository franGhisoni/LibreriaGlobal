import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Editorial } from './editorial.entity';

@Entity('direcciones')
export class Address {
  @PrimaryGeneratedColumn({ name: 'Pk_Direcciones_ID' })
  id: number;

  @Column()
  calle: string;

  @Column()
  numero: number;

  @Column()
  piso: string;

  @Column()
  departamento: string;

  @Column()
  ciudad: string;

  @Column()
  provincia: string;

  @Column({ name: 'Codigo_Postal' })
  codigoPostal: string;

  @OneToMany(() => Editorial, (editorial) => editorial.address)
  editorials: Editorial[];
}
