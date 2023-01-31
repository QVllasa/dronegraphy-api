import {Attachment, AttachmentSchema} from 'src/common/entities/attachment.entity';
import {CoreEntity} from 'src/common/entities/core.entity';
import {User, UserSchema} from './user.entity';
import mongoose from "mongoose";

export class Profile extends CoreEntity {
    avatar?: Attachment;
    bio?: string;
    socials?: Social[];
    contact?: string;
    customer?: User;
}


export class Social {
    type: string;
    link: string;
}

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




