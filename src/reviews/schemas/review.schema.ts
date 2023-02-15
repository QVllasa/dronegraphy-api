import mongoose from "mongoose";
import {AttachmentSchema} from "../../common/entities/attachment.entity";
import {UserSchema} from "../../users/schemas/user.schema";
import {ProductSchema} from "../../products/schema/product.schema";
import {FeedbackSchema} from "../../feedbacks/schemas/feedback.schema";
import {ReportSchema} from "./reports.schema";

export const ReviewSchema = new mongoose.Schema({
    rating: Number,
    name: String,
    comment: String,
    shop: Number,
    order: Number,
    customer: Number,
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
