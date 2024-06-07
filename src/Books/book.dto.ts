import { IsNotEmpty, IsNumber, IsString, IsDate, IsOptional, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class BookDTO {
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsNotEmpty()
  @IsNumber()
  editorialId: number;

  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  authorIds: number[];

  @IsNotEmpty()
  @IsString()
  categoriaLiteraria: string;

  @IsNotEmpty()
  @IsNumber()
  precio: number;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  fechaLanzamiento: Date;

  @IsOptional()
  @IsString()
  descripcion: string;
}

export class UpdateBookDTO {
  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsNumber()
  editorialId?: number;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  authorIds?: number[];

  @IsOptional()
  @IsString()
  categoriaLiteraria?: string;

  @IsOptional()
  @IsNumber()
  precio?: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  fechaLanzamiento?: Date;

  @IsOptional()
  @IsString()
  descripcion?: string;
}

export class BookResponseDTO {
  id: number;
  titulo: string;
  editorial: string;
  autores: string[];
  categoriaLiteraria: string;
  precio: number;
  fechaLanzamiento: Date;
  descripcion?: string;
}
