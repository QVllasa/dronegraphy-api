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

@Module({
    controllers: [
        ShopsController,
        StaffsController,
        TopShopsController,
        DisapproveShop,
        FollowShopController,
        FollowedShops,
    ],
    providers: [ShopsService],
})
export class ShopsModule {
}
