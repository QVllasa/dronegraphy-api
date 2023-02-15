import mongoose from "mongoose";

import {UserSchema} from "../../users/schemas/user.schema";
import {CouponSchema} from "../../coupons/schemas/coupon.schema";
import {ShopSchema} from "../../shops/schemas/shop.schema";
import {FileSchema, ProductSchema} from "../../products/schema/product.schema";
import {UserAddressSchema} from "../../addresses/schemas/address.schema";
import {OrderStatusSchema} from "./order-status.schema";

export const OrderSchema = new mongoose.Schema({
    tracking_number: String,
    customer_id: Number,
    customer_contact: String,
    customer: UserSchema,
    status: OrderStatusSchema,
    amount: Number,
    sales_tax: Number,
    total: Number,
    paid_total: Number,
    payment_id: String,
    payment_gateway: String,
    coupon: CouponSchema,
    shop: ShopSchema,
    discount: Number,
    delivery_fee: Number,
    delivery_time: String,
    products: [ProductSchema],
    billing_address: UserAddressSchema,
    shipping_address: UserAddressSchema,
    language: [String],
    translated_languages: [String],
})

export const OrderFilesSchema = new mongoose.Schema({
    purchase_key: String,
    digital_file_id: Number,
    order_id: Number,
    customer_id: Number,
    file: FileSchema,
    fileable: ProductSchema,
})
