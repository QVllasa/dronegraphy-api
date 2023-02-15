import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {ProfilesController, UsersController} from './users.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {ProfileSchema} from "./schemas/profile.schema";
import {UserSchema} from "./schemas/user.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: "User", schema: UserSchema},
            {name: "Profile", schema: ProfileSchema}
        ])
    ],
    exports: [UsersService],
    controllers: [UsersController, ProfilesController],
    providers: [UsersService],
})
export class UsersModule {
}
