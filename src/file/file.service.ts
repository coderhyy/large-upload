import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { File } from './file.entity';
import { CreateFileDto } from './create-file.dto';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {}

  async getList(query) {
    const { keyWords = '', page = 1, pageSize = 10 } = query;
    const [list, total] = await this.fileRepository.findAndCount({
      where: {
        name: Like(`%${keyWords}%`),
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return { list, total };
  }

  create(createFileDto: CreateFileDto) {
    return this.fileRepository.save(createFileDto);
  }
}
