import mongoose from "mongoose";
import {UserSchema} from "../../users/schemas/user.schema";
import {AttachmentSchema} from "../../common/entities/attachment.entity";
import {UserAddressSchema} from "../../addresses/schemas/address.schema";
import {LocationSchema, ShopSocialsSchema} from "../../settings/schemas/setting.schemas";


export const PaymentInfoSchema = new mongoose.Schema({
    account: String,
    name: String,
    email: String,
    bank: String,
})

export const BalanceSchema = new mongoose.Schema({
    id: Number,
    admin_commission_rate: Number,
    total_earnings: Number,
    withdrawn_amount: Number,
    current_balance: Number,
    payment_info: PaymentInfoSchema,
})

export const ShopSettingsSchema = new mongoose.Schema({
    socials: [ShopSocialsSchema],
    contact: String,
    location: LocationSchema,
    website: String,
})


export const ShopSchema = new mongoose.Schema({
    owner_id: Number,
    owner: UserSchema,
    staffs: [UserSchema],
    is_active: Boolean,
    orders_count: Number,
    products_count: Number,
    balance: BalanceSchema,
    name: String,
    slug: String,
    description: String,
    cover_image: AttachmentSchema,
    logo: AttachmentSchema,
    address: UserAddressSchema,
    settings: ShopSettingsSchema,
})
