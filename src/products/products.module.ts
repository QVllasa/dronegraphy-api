import {Module} from '@nestjs/common';
import {ProductsService} from './products.service';
import {FollowedShopsProductsController, PopularProductsController, ProductsController,} from './products.controller';

@Module({
  controllers: [ProductsController, PopularProductsController, FollowedShopsProductsController],
  providers: [ProductsService],
})
export class ProductsModule {
}
