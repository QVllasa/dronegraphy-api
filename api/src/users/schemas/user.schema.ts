import mongoose from "mongoose";
import {ProfileSchema} from "../entities/profile.entity";
import {OrderSchema} from "../../orders/schemas/order.schema";
import {ShopSchema} from "../../shops/schemas/shop.schema";
import {AddressSchema} from "../../addresses/schemas/address.schema";


export const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    shop_id: Number,
    profile: ProfileSchema,
    shops: [ShopSchema],
    managed_shop: ShopSchema,
    is_active: Boolean,
    address: [AddressSchema],
    orders: [OrderSchema],
});
