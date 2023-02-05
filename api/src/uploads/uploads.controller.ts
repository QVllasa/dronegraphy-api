import {Controller, Post, UploadedFile, UploadedFiles, UseInterceptors,} from '@nestjs/common';
import {FileInterceptor, FilesInterceptor} from '@nestjs/platform-express';
import {UploadsService} from './uploads.service';
import {diskStorage} from "multer";
import e from "express";
import {extname} from 'path';
import {Attachment} from "../common/entities/attachment.entity";


@Controller('attachments')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {
  }

  @Post()
  @UseInterceptors(FilesInterceptor('attachment[]', 10, {dest: './public/files'}))
  uploadFile(@UploadedFiles() attachments: Array<Express.Multer.File>) {
    console.log(attachments);
    return attachments;
  }

  @Post('avatar')
  @UseInterceptors(FileInterceptor('attachment', {
    storage: diskStorage({
      destination: './public/files/avatar',
      filename(req: e.Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        const fileName = `${uniqueSuffix}${ext}`
        callback(null, fileName);
      }
    })
  }))
  uploadAvatar(@UploadedFile() attachment: Express.Multer.File) {
    console.log("upload avatar", attachment);
    const file: Attachment = {
      original: attachment.originalname,
      size: attachment.size,
      filename: attachment.filename,
      path: process.env.DOMAIN + attachment.path.replace('public', ''),
      __typename: attachment.mimetype,
    }
    return file;
  }

}
