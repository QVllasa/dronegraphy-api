import mongoose from "mongoose";
import {UserSchema} from "../../users/schemas/user.schema";


export const ReportSchema = new mongoose.Schema({
    user_id: Number,
    user: [UserSchema],
    model_id: Number,
    model_type: String,
    message: String,
})
