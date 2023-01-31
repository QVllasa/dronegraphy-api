import mongoose from "mongoose";
import {AttachmentSchema} from "../../common/entities/attachment.entity";
import {TypeSchema} from "../../types/entities/type.entity";
import {ProductSchema} from "../../products/schema/product.schema";

export const TagSchema = new mongoose.Schema({
    name: String,
    slug: String,
    parent: Number,
    details: String,
    image: AttachmentSchema,
    icon: String,
    type: TypeSchema,
    products: [ProductSchema],
    language: String,
    translated_languages: [String],
})
