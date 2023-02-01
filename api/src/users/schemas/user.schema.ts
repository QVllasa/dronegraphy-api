import mongoose from "mongoose";
import {AddressSchema} from "../../addresses/schemas/address.schema";
import {ProfileSchema} from "./profile.schema";


export const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    shop_id: Number,
    profile: ProfileSchema,
    shops: [String],
    managed_shop: Number,
    is_active: Boolean,
    address: [AddressSchema],
    orders: [String],
});
