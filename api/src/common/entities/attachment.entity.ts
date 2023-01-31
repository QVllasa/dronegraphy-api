import {CoreEntity} from 'src/common/entities/core.entity';
import mongoose from "mongoose";

export class Attachment extends CoreEntity {
    thumbnail?: string;
    original?: string;
}

export const AttachmentSchema = new mongoose.Schema({
    thumbnail: String,
    original: String,
});
