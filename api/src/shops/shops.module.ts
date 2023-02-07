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

@Module({
    imports: [JwtModule.registerAsync(jwtConfig),],
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
