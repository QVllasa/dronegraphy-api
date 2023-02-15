import mongoose from "mongoose";
import {ShopSchema} from "../../shops/schemas/shop.schema";


export const AttributeSchema = new mongoose.Schema({
    name: String,
    shop_id: String,
    shop: ShopSchema,
    slug: String,
    values: [String],
    language: String,
    translated_languages: [String],
})
