import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEditorialDto } from './dto/create-editorial.dto';
import { UpdateEditorialDto } from './dto/update-editorial.dto';
import { Editorial } from './entities/editorial.entity';
import { Address } from './entities/address.entity';

@Injectable()
export class EditorialService {
  constructor(
    @InjectRepository(Editorial)
    private editorialRepository: Repository<Editorial>,
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  async create(createEditorialDto: CreateEditorialDto) {
    const newAddress = this.addressRepository.create(createEditorialDto.address);
    await this.addressRepository.save(newAddress);

    const newEditorial = this.editorialRepository.create({
      ...createEditorialDto,
      address: newAddress,
    });
    
    
    await this.editorialRepository.save(newEditorial);

    return newEditorial;
  }

  async findAll() {
    return await this.editorialRepository.find({ relations: ['address'] });
  }
  
  async findOne(id: number) {
    return await this.editorialRepository.findOne({where: { id },  relations: ['address'] });
  }
  async update(id: number, updateEditorialDto: UpdateEditorialDto) {
    await this.editorialRepository.update(id, updateEditorialDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const editorialToRemove = await this.findOne(id);
    return await this.editorialRepository.remove(editorialToRemove);
  }
}
