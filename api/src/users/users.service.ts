import {Injectable} from '@nestjs/common';
import {plainToClass} from 'class-transformer';
import {CreateUserDto} from './dto/create-user.dto';
import {GetUsersDto, UserPaginator} from './dto/get-users.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import Fuse from 'fuse.js';

import {User} from './entities/user.entity';
import usersJson from '@db/users.json';
import {paginate} from 'src/common/pagination/paginate';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {RegisterDto} from "../auth/dto/create-auth.dto";

const users = plainToClass(User, usersJson);

const options = {
    keys: ['name', 'type.slug', 'categories.slug', 'status'],
    threshold: 0.3,
};
const fuse = new Fuse(users, options);

@Injectable()
export class UsersService {
    private users: User[] = users;

    constructor(@InjectModel('User')
                private userModel: Model<User>) {
    }

    create(createUserDto: CreateUserDto | RegisterDto | User): Promise<User> {
        return this.userModel.create({
            name: createUserDto.name,
            email: createUserDto.email,
            password: createUserDto.password,
        });
    }

    async getUsers({text, limit, page, search,}: GetUsersDto): Promise<UserPaginator> {
        if (!page) page = 1;
        if (!limit) limit = 30;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        let data: User[] = this.users;

        if (search?.replace(/%/g, '')) {
            data = fuse.search(search)?.map(({item}) => item);
        }

        if (search) {
            const parseSearchParams = search.split(';');
            const searchText: any = [];
            for (const searchParam of parseSearchParams) {
                const [key, value] = searchParam.split(':');
                // TODO: Temp Solution
                if (key !== 'slug') {
                    searchText.push({
                        [key]: value,
                    });
                }
            }

            data = fuse
                .search({
                    $and: searchText,
                })
                ?.map(({item}) => item);
        }

        const results = data.slice(startIndex, endIndex);
        const url = `/users?limit=${limit}`;

        return {
            data: results,
            ...paginate(data.length, page, limit, results.length, url),
        };
    }

    findOne(id: string) {
        return this.userModel.findOne({_id: String(id)});
    }

    async findOneByEmail(email: string): Promise<User> {
        return this.userModel.findOne({email});
    }

    update(id: string, updateUserDto: UpdateUserDto) {
        return this.users[0];
    }

    remove(id: string) {
        return `This action removes a #${id} user`;
    }

    makeAdmin(user_id: string) {
        return this.users.find((u) => u._id === (user_id));
    }

    banUser(id: string) {
        const user = this.users.find((u) => u._id === (id));

        user.is_active = !user.is_active;

        return user;
    }

    activeUser(id: string) {
        const user = this.users.find((u) => u._id === (id));

        user.is_active = !user.is_active;

        return user;
    }
}
