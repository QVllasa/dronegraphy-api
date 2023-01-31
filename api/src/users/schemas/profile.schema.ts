import {AttachmentSchema} from 'src/common/entities/attachment.entity';
import mongoose from "mongoose";
import {UserSchema} from "./user.schema";


export const SocialSchema = new mongoose.Schema({
    type: String,
    link: String,
});

export const ProfileSchema = new mongoose.Schema({
    bio: String,
    contact: String,
    avatar: AttachmentSchema,
    socials: [SocialSchema],
    customer: UserSchema,
});




