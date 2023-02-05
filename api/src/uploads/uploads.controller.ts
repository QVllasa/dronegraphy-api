import {Controller, Post, UploadedFile, UploadedFiles, UseInterceptors,} from '@nestjs/common';
import {FileInterceptor, FilesInterceptor} from '@nestjs/platform-express';
import {UploadsService} from './uploads.service';
import {diskStorage} from "multer";
import e from "express";
import * as path from 'path';
import {extname} from 'path';
import {Attachment} from "../common/entities/attachment.entity";
import sharp from 'sharp';


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
    async uploadAvatar(@UploadedFile() attachment: Express.Multer.File) {
        console.log("upload avatar", attachment);
        const thumbnail = path.join('./public/files/thumbnails', 'thumbnail-' + attachment.filename)
        const res = await sharp(attachment.path)
            .resize(64, 64, {fit: 'contain'})
            .toFile(thumbnail);

        const file: Attachment = {
            original: attachment.originalname,
            size: attachment.size,
            filename: attachment.filename,
            path: process.env.DOMAIN + attachment.path.replace('public', ''),
            thumbnail: process.env.DOMAIN + thumbnail.replace('public', ''),
            __typename: attachment.mimetype,
        }
        return file;
    }

}
