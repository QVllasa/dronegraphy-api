import mongoose from "mongoose";
import {TypeSchema} from "../../types/entities/type.entity";
import {CategorySchema} from "../../categories/entities/category.entity";
import {TagSchema} from "../../tags/entities/tag.entity";
import {AttributeValueSchema} from "../../attributes/entities/attribute-value.entity";
import {ShopSchema} from "../../shops/entities/shop.entity";
import {AttachmentSchema} from "../../common/entities/attachment.entity";
import {ReviewSchema} from "../../reviews/entities/review.entity";
import {OrderSchema} from "../../orders/schemas/order.schema";

export const VariationOptionSchema = new mongoose.Schema({
    name: String,
    value: String,
})

export const VariationSchema = new mongoose.Schema({
    id: Number,
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
    categories: [CategorySchema],
    tags: [TagSchema],
    variations: [AttributeValueSchema],
    variation_options: [VariationSchema],
    pivot: OrderProductPivotSchema,
    orders: [OrderSchema],
    shop: ShopSchema,
    shop_id: Number,
    description: String,
    in_stock: Boolean,
    is_taxable: Boolean,
    sale_price: Number,
    max_price: Number,
    min_price: Number,
    sku: String,
    gallery: [AttachmentSchema],
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
    my_review: [ReviewSchema],
    language: String,
    translated_languages: [String]
})

export const FileSchema = new mongoose.Schema({
    attachment_id: Number,
    url: String,
    fileable_id: Number,
})
