import mongoose from "mongoose";
import {AttributeSchema} from "./attribute.schema";


export const AttributeValueSchema = new mongoose.Schema({
    shop_id: Number,
    value: String,
    meta: String,
    attribute: AttributeSchema,
})
