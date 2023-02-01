import mongoose from "mongoose";


export const ReportSchema = new mongoose.Schema({
    user_id: Number,
    user: [String],
    model_id: Number,
    model_type: String,
    message: String,
})
