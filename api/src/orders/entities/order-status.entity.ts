import {CoreEntity} from 'src/common/entities/core.entity';
import mongoose from "mongoose";

export class OrderStatus extends CoreEntity {
    name: string;
    color: string;
    serial: number;
    slug: string;
    language: string;
    translated_languages: string[];
}

export const OrderStatusSchema = new mongoose.Schema({})
