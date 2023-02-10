import {Address} from 'src/addresses/entities/address.entity';
import {CoreEntity} from 'src/common/entities/core.entity';
import {Shop} from 'src/shops/entities/shop.entity';
import {Profile} from './profile.entity';
import {Order} from "../../orders/entities/order.entity";

export class User extends CoreEntity {
    name?: string;
    email?: string;
    password?: string;
    shop_id?: number;
    profile?: Profile;
    shop?: Shop | string;
    is_active?: boolean = true;
    address?: Address[];
    orders?: Order[];
    permission?: string
}



