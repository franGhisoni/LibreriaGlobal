import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Editorial } from './entities/editorial.entity';
import { EditorialService } from './editorial.service';
import { EditorialController } from './editorial.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Editorial])],
  providers: [EditorialService],
  controllers: [EditorialController],
})
export class EditorialModule {}
