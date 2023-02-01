import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {jwtConstants} from "./constants";
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {UsersModule} from "../users/users.module";
import {LocalStrategy} from "./local.strategy";
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "../users/schemas/user.schema";
import {ProfileSchema} from "../users/schemas/profile.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: "User", schema: UserSchema},
            {name: "Profile", schema: ProfileSchema}
        ]),
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '60s'},
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy],
})
export class AuthModule {
}
