import mongoose from "mongoose";
import {ShopSchema} from "../../shops/entities/shop.entity";
import {AttachmentSchema} from "../../common/entities/attachment.entity";
import {FeedbackSchema} from "../../feedbacks/entities/feedback.entity";
import {ReportSchema} from "../entities/reports.entity";
import {OrderSchema} from "../../orders/schemas/order.schema";
import {UserSchema} from "../../users/schemas/user.schema";
import {ProductSchema} from "../../products/schema/product.schema";

export const ReviewSchema = new mongoose.Schema({
    rating: Number,
    name: String,
    comment: String,
    shop: ShopSchema,
    order: OrderSchema,
    customer: UserSchema,
    photos: [AttachmentSchema],
    user: UserSchema,
    product: ProductSchema,
    feedbacks: [FeedbackSchema],
    my_feedback: FeedbackSchema,
    positive_feedbacks_count: Number,
    negative_feedbacks_count: Number,
    user_id: Number,
    product_id: Number,
    abusive_reports: [ReportSchema],
    shop_id: String,
    variation_option_id: String,
    abusive_reports_count: Number,
})
