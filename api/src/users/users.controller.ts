import {Body, Controller, Delete, Get, Param, Post, Put, Query,} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {CreateProfileDto} from './dto/create-profile.dto';
import {UpdateProfileDto} from './dto/update-profile.dto';
import {GetUsersDto} from './dto/get-users.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    getAllUsers(@Query() query: GetUsersDto) {
        return this.usersService.getUsers(query);
    }

    @Get(':id')
    getUser(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    //update user
    @Put(':id')
    updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        console.log("id: ", id);
        console.log("user to update", updateUserDto)
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    removeUser(@Param('id') id: string) {
        return this.usersService.remove(id);
    }

    @Post('unblock-user')
    activeUser(@Body('id') id: string) {
        return this.usersService.activeUser(id);
    }

    @Post(':id/ban')
    banUser(@Param('id') id: string) {
        console.log(id);
        // return this.usersService.getUsers(updateUserInput.id);
    }

    @Post('block-user')
    blockUser(@Body('id') id: string) {
        return this.usersService.banUser(id);
    }

    @Post('unblock-user')
    unBlockUser(@Body('id') id: string) {
        return this.usersService.activeUser(id);
    }
}

@Controller('profiles')
export class ProfilesController {
    constructor(private readonly usersService: UsersService) {
    }

    @Post()
    createProfile(@Body() createProfileDto: CreateProfileDto) {
        console.log(createProfileDto);
    }

    @Put(':id')
    updateProfile(@Body() updateProfileDto: UpdateProfileDto) {
        console.log(updateProfileDto);
    }

    @Delete(':id')
    deleteProfile(@Param('id') id: string) {
        return this.usersService.remove(id);
    }
}
