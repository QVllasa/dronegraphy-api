import {Strategy} from 'passport-local';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {AuthService} from './auth.service';
import {LoginDto} from "./dto/create-auth.dto";
import {User} from "../users/entities/user.entity";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super(
            {usernameField: 'email'}
        );
    }

    async validate(loginInput: LoginDto): Promise<User> {
        console.log("loginInput local Strategy: ", loginInput);
        const user = await this.authService.validateUser(loginInput);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
