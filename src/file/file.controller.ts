import { resolve } from 'path';

import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
// import { Express } from 'express';
import multer = require('multer');

import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('list')
  async getList(@Query() query) {
    const { list, total } = await this.fileService.getList(query);
    return {
      statusCode: 200,
      message: 'ok',
      data: {
        list,
        total,
      },
    };
  }

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('file', 9, {
      storage: multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, resolve(process.cwd(), 'public'));
        },
        filename: function (req, file, cb) {
          const unique = `${Date.now()}${Math.round(Math.random() * 1e9)}`;
          const imgPath = `${unique}.${file.mimetype.split('/')[1]}`;
          cb(null, imgPath);
        },
      }),
      limits: {
        fileSize: 1024 * 1024,
      },

      fileFilter(req, file, cb) {
        if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
          // throw new BadRequestException(`只支持jpg, png格式`);
          cb(new BadRequestException(`只支持jpg, png格式`), false);
        } else {
          cb(null, true);
        }
      },
    }),
  )
  async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    const list = [];
    files.forEach((file) => {
      list.push({
        url: `/static/${file.filename}`,
        name: file.originalname,
        size: file.size,
      });
    });

    const goods = await this.fileService.create(list);

    return {
      statusCode: 200,
      data: {
        list: goods,
      },
      message: '上传成功',
    };
  }
}
