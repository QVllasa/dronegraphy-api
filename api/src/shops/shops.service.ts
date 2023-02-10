import {Injectable} from '@nestjs/common';
import {plainToClass} from 'class-transformer';
import {CreateShopDto} from './dto/create-shop.dto';
import {UpdateShopDto} from './dto/update-shop.dto';
import {Shop} from './entities/shop.entity';
import shopsJson from '@db/shops.json';
import userJson from '@db/users.json';
import Fuse from 'fuse.js';
import {GetShopsDto} from './dto/get-shops.dto';
import {paginate} from 'src/common/pagination/paginate';
import {GetStaffsDto} from './dto/get-staffs.dto';
import {GetTopShopsDto} from './dto/get-top-shops.dto';
import {User} from 'src/users/entities/user.entity';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {AuthService} from "../auth/auth.service";
import {UsersService} from "../users/users.service";

const shops = plainToClass(Shop, shopsJson);
const users = plainToClass(User, userJson);

const options = {
    keys: ['name', 'type.slug', 'is_active'],
    threshold: 0.3,
};
const fuse = new Fuse(shops, options);

@Injectable()
export class ShopsService {
    private shops: Shop[] = shops;
    private users: User[] = users;

    constructor(@InjectModel('Shop')
                private shopModel: Model<Shop>, private authService: AuthService, private userService: UsersService) {
    }

    async create(createShopDto: CreateShopDto, token: string) {
        const userId = this.authService.getTokenPayload(token).sub;
        const shop: Shop = {
            address: undefined,
            cover_image: undefined,
            is_active: true,
            orders_count: 0,
            owner: userId,
            products_count: 0,
            slug: "",
            ...createShopDto
        }

        const res = await this.shopModel.create(shop)
        await this.userService.update(userId, {shop: res.id})
        return res;
    }

    getShops({search, limit, page}: GetShopsDto) {
        if (!page) page = 1;

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        let data: Shop[] = this.shops;
        if (search) {
            const parseSearchParams = search.split(';');
            for (const searchParam of parseSearchParams) {
                const [key, value] = searchParam.split(':');
                // data = data.filter((item) => item[key] === value);
                data = fuse.search(value)?.map(({item}) => item);
            }
        }
        // if (text?.replace(/%/g, '')) {
        //   data = fuse.search(text)?.map(({ item }) => item);
        // }
        const results = data.slice(startIndex, endIndex);
        const url = `/shops?search=${search}&limit=${limit}`;

        return {
            data: results,
            ...paginate(data.length, page, limit, results.length, url),
        };
    }

    getStaffs({shop_id, limit, page}: GetStaffsDto) {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        let staffs: Shop['staffs'] = [];
        if (shop_id) {
            staffs = this.shops.find((p) => p._id === String(shop_id))?.staffs ?? [];
        }
        const results = staffs?.slice(startIndex, endIndex);
        const url = `/staffs?limit=${limit}`;

        return {
            data: results,
            ...paginate(staffs?.length, page, limit, results?.length, url),
        };
    }

    getShop(slug: string): Shop {
        return this.shops.find((p) => p.slug === slug);
    }

    update(id: string, updateShopDto: UpdateShopDto) {
        return this.shops[0];
    }

    approve(id: string) {
        return this.shops[0];
    }

    remove(id: string) {
        return this.shops[0];
    }

    topShops({search, limit, page}: GetTopShopsDto) {
        if (!page) page = 1;
        if (!limit) limit = 15;

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        let data: Shop[] = this.shops;

        if (search) {
            const parseSearchParams = search.split(';');
            const searchText: any = [];
            for (const searchParam of parseSearchParams) {
                const [key, value] = searchParam.split(':');
                searchText.push({
                    [key]: value,
                });
            }

            data = fuse
                .search({
                    $and: searchText,
                })
                ?.map(({item}) => item);
        }

        const results = data.slice(startIndex, endIndex);
        const url = `/top-shops?search=${search}&limit=${limit}`;

        return {
            data: results,
            ...paginate(data.length, page, limit, results.length, url),
        };
    }

    disapproveShop(id: string) {
        const shop = this.shops.find((s) => s._id === String(id));
        shop.is_active = false;

        return shop;
    }

    approveShop(id: string) {
        const shop = this.shops.find((s) => s._id === String(id));
        shop.is_active = true;

        return shop;
    }

    followShop(shop_id: any) {
        // const user = this.users[0];
        // const isFollowed = user.shops.includes(shop_id);
        //
        // if (isFollowed) {
        //     user.shops = user.shops.filter((s) => s !== shop_id);
        //     return false;
        // }
        //
        // user.shops.push(shop_id);

        return true;
    }

    getFollowShop(shop_id: any) {
        // const user = this.users[0];
        // const isFollowed = user.shops.includes(shop_id);
        //
        // if (isFollowed) {
        //   user.shops = user.shops.filter((s) => s !== shop_id);
        //   return true;
        // }

        return true;
    }

    // followedShops({ limit }: GetFollowedShops): Shop[] {
    //   return this.shops?.slice(0, limit);
    // }
}
