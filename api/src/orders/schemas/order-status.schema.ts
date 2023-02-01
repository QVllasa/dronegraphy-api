import mongoose from "mongoose";

export const OrderStatusSchema = new mongoose.Schema({
    name: String,
    color: String,
    serial: Number,
    slug: String,
    language: String,
    translated_languages: [String],
})
