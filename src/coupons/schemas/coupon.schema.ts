import mongoose from "mongoose";
import {AttachmentSchema} from "../../common/entities/attachment.entity";

export const CouponSchema = new mongoose.Schema({
    code: String,
    description: String,
    type: String,
    image: AttachmentSchema,
    is_valid: Boolean,
    amount: Number,
    active_from: String,
    expire_at: String,
    language: String,
    translated_languages: [String],
})
