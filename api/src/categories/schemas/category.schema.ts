import mongoose from "mongoose";
import {AttachmentSchema} from "../../common/entities/attachment.entity";
import {TypeSchema} from "../../types/schemas/type.schema";


export const CategorySchema = new mongoose.Schema({
    name: String,
    slug: String,
    details: String,
    image: AttachmentSchema,
    icon: String,
    type: TypeSchema,
    products: [String],
    language: String,
    translated_languages: [String],
})
