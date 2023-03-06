import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FileModule } from './file/file.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'image',
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
    FileModule,
  ],
})
export class ApplicationModule {}
