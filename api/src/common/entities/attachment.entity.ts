import {CoreEntity} from 'src/common/entities/core.entity';
import mongoose from "mongoose";

export class Attachment extends CoreEntity {
    thumbnail?: string;
    original?: string;
    filename: string;
    path: string;
    size: number;
    __typename?: string;
}

export const AttachmentSchema = new mongoose.Schema({
    thumbnail: String,
    original: String,
    filename: String,
    path: String,
    size: Number,
    __typename: String,
    created_at: {type: Date},
    updated_at: {type: Date},
});
