import mongoose from "mongoose";
import {ShopSchema} from "../../shops/entities/shop.entity";
import {AttributeValueSchema} from "./attribute-value.schema";


export const AttributeSchema = new mongoose.Schema({
    name: String,
    shop_id: String,
    shop: ShopSchema,
    slug: String,
    values: [AttributeValueSchema],
    language: String,
    translated_languages: [String],
})
