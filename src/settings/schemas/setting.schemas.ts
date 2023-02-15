import mongoose from "mongoose";

export const ShopSocialsSchema = new mongoose.Schema({
    icon: String,
    url: String,
})

export const LocationSchema = new mongoose.Schema({
    lat: Number,
    lng: Number,
    city: String,
    state: String,
    country: String,
    zip: String,
    formattedAddress: String,
})
