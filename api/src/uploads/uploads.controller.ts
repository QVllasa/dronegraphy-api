import {Controller, Post, UploadedFile, UploadedFiles, UseInterceptors,} from '@nestjs/common';
import {FileInterceptor, FilesInterceptor} from '@nestjs/platform-express';
import {UploadsService} from './uploads.service';
import {diskStorage} from "multer";
import e from "express";


const config = (path: string) => {
    return {
        storage: diskStorage({
            destination: path,
            filename(req: e.Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
                const fileName = this.uploadsService.uniqueFilename(file);
                callback(null, fileName);
            }
        })
    }
}

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

    @Post('logo')
    @UseInterceptors(FileInterceptor('attachment', config('./public/files/logo')))
    async uploadLogo(@UploadedFile() attachment: Express.Multer.File) {
        return this.uploadsService.createAttachment(attachment);
    }

    @Post('avatar')
    @UseInterceptors(FileInterceptor('attachment', config('./public/files/avatar')))
    async uploadAvatar(@UploadedFile() attachment: Express.Multer.File) {
        return this.uploadsService.createAttachment(attachment);
    }

}
