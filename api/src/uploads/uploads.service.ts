import {Injectable} from '@nestjs/common';
import path, {extname} from "path";
import {Attachment} from "../common/entities/attachment.entity";
import sharp from 'sharp';

@Injectable()
export class UploadsService {
    findAll() {
        return `This action returns all uploads`;
    }

    findOne(id: string) {
        return `This action returns a #${id} upload`;
    }

    remove(id: string) {
        return `This action removes a #${id} upload`;
    }

    uniqueFilename(file: Express.Multer.File) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        return `${uniqueSuffix}${ext}`;
    }

    async createAttachment(attachment: Express.Multer.File) {
        const thumbnail = path.join('./public/files/thumbnails', 'thumbnail-' + attachment.filename)
        await sharp(attachment.path)
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
