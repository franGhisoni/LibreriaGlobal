import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EditorialService } from './editorial.service';
import { EditorialController } from './editorial.controller';
import { Editorial } from './entities/editorial.entity';
import { Address } from './entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Editorial, Address])],
  controllers: [EditorialController],
  providers: [EditorialService],
})
export class EditorialModule {}
