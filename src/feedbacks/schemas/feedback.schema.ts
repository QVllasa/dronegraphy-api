import mongoose from "mongoose";

export const FeedbackSchema = new mongoose.Schema({
    user_id: String,
    model_type: String,
    model_id: String,
    positive: Boolean,
    negative: Boolean,
})
