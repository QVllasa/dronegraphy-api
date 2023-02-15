import mongoose from "mongoose";
import {AddressSchema} from "../../addresses/schemas/address.schema";
import {ProfileSchema} from "./profile.schema";


export const UserSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    password: String,
    shop_id: Number,
    profile: ProfileSchema,
    shop: {type: mongoose.Schema.Types.ObjectId, ref: 'Shop'},
    managed_shop: Number,
    is_active: Boolean,
    address: [AddressSchema],
    orders: [String],
    permission: String,
});
