import mongoose from "mongoose";
import {UserSchema} from "../../users/schemas/user.schema";


export const UserAddressSchema = new mongoose.Schema({
    street_address: String,
    country: String,
    city: String,
    state: String,
    zip: String,
})

export const AddressSchema = new mongoose.Schema({
    title: String,
    default: Boolean,
    address: UserAddressSchema,
    type: String,
    customer: UserSchema,
})
