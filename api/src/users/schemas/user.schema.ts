import mongoose from "mongoose";
import {ProfileSchema} from "../entities/profile.entity";
import {ShopSchema} from "../../shops/entities/shop.entity";
import {AddressSchema} from "../../addresses/entities/address.entity";
import {OrderSchema} from "../../orders/schemas/order.schema";


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
