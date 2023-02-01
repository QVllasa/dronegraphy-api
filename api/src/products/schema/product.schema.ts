import mongoose from "mongoose";
import {AttachmentSchema} from "../../common/entities/attachment.entity";
import {TypeSchema} from "../../types/schemas/type.schema";
import {AttributeValueSchema} from "../../attributes/schemas/attribute-value.schema";
import {ShopSchema} from "../../shops/schemas/shop.schema";

export const VariationOptionSchema = new mongoose.Schema({
    name: String,
    value: String,
})

export const VariationSchema = new mongoose.Schema({
    _id: String,
    title: String,
    price: Number,
    sku: String,
    is_disable: Boolean,
    sale_price: Number,
    quantity: Number,
    options: [VariationOptionSchema],
})

export const OrderProductPivotSchema = new mongoose.Schema({
    variation_option_id: Number,
    order_quantity: Number,
    unit_price: Number,
    subtotal: Number,
})

export const ProductSchema = new mongoose.Schema({
    name: String,
    slug: String,
    type: TypeSchema,
    type_id: Number,
    product_type: String,
    categories: [String],
    tags: [String],
    variations: [AttributeValueSchema],
    variation_options: [VariationSchema],
    pivot: OrderProductPivotSchema,
    orders: [String],
    shop: ShopSchema,
    shop_id: Number,
    description: String,
    in_stock: Boolean,
    is_taxable: Boolean,
    sale_price: Number,
    max_price: Number,
    min_price: Number,
    sku: String,
    gallery: [String],
    image: AttachmentSchema,
    status: String,
    height: String,
    length: String,
    width: String,
    price: Number,
    quantity: Number,
    unit: String,
    ratings: Number,
    in_wishlist: Boolean,
    my_review: [String],
    language: String,
    translated_languages: [String]
})

export const FileSchema = new mongoose.Schema({
    attachment_id: Number,
    url: String,
    fileable_id: Number,
})
