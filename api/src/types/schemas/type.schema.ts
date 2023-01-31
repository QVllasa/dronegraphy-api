import mongoose from "mongoose";
import {AttachmentSchema} from "../../common/entities/attachment.entity";

export const BannerSchema = new mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    image: AttachmentSchema,
})

export const TypeSettingsSchema = new mongoose.Schema({
    isHome: Boolean,
    layoutType: String,
    productCard: String,
})

export const TypeSchema = new mongoose.Schema({
    name: String,
    slug: String,
    image: AttachmentSchema,
    icon: String,
    banners: [BannerSchema],
    promotional_sliders: [AttachmentSchema],
    settings: TypeSettingsSchema,
    language: String,
    translated_languages: [String],
})
