import {Module} from '@nestjs/common';
import {ShopsService} from './shops.service';
import {
    DisapproveShop,
    FollowedShops,
    FollowShopController,
    ShopsController,
    StaffsController,
    TopShopsController,
} from './shops.controller';
import {JwtModule} from "@nestjs/jwt";
import {jwtConfig} from "../config/jwt.config";
import {JwtStrategy} from "../auth/jwt.strategy";
import {MongooseModule} from "@nestjs/mongoose";
import {ShopSchema} from "./schemas/shop.schema";
import {AuthModule} from "../auth/auth.module";

@Module({
    imports: [
        JwtModule.registerAsync(jwtConfig),
        MongooseModule.forFeature([{name: "Shop", schema: ShopSchema},]),
        AuthModule
    ],
    controllers: [
        ShopsController,
        StaffsController,
        TopShopsController,
        DisapproveShop,
        FollowShopController,
        FollowedShops,

    ],
    providers: [ShopsService, JwtStrategy],
})
export class ShopsModule {
}
