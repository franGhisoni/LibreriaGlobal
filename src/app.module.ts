import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BookModule } from './Books/book.module';
import { AuthorModule } from './author/author.module';
import { EditorialModule } from './editorial/editorial.module';
import { BookAuthorModule } from './book-author/book-author.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT'), 1433),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
        extra: {
          trustServerCertificate: true,
        },
      }),
      inject: [ConfigService],
    }),
    BookModule,
    AuthorModule,
    EditorialModule,
    BookAuthorModule,
  ],
})
export class AppModule {}
