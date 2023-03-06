import { resolve } from 'path';

import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('list')
  findAll() {
    return this.fileService.findAll();
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: resolve(__dirname, '../uploads'),
      preservePath: true,
      fileFilter(req, file, callback) {
        const pattern = /^image\/(jpeg|png|webp)/;

        if (pattern.test(file.mimetype)) {
          callback(null, true);
        } else {
          callback(null, false);
        }
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return {
        code: 500,
        data: null,
        msg: 'Only image files can be uploaded!',
      };
    }

    return 'upload';
  }
}
