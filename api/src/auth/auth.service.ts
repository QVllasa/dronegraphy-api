import {HttpException, HttpStatus, Injectable, NotAcceptableException, UnauthorizedException,} from '@nestjs/common';
import {
    AuthResponse,
    ChangePasswordDto,
    CoreResponse,
    ForgetPasswordDto,
    LoginDto,
    OtpDto,
    OtpLoginDto,
    OtpResponse,
    RegisterDto,
    ResetPasswordDto,
    SocialLoginDto,
    VerifyForgetPasswordDto,
    VerifyOtpDto,
} from './dto/create-auth.dto';
import {User} from 'src/users/entities/user.entity';
import {JwtService} from '@nestjs/jwt';
import {UsersService} from "../users/users.service";
import * as bcrypt from 'bcrypt';


interface JwTPayload {
    email: string,
    sub: string,
    permission: string,
    iat?: number,
    exp?: number,
}


@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService, private usersService: UsersService) {
    }

    async register(createUserInput: RegisterDto): Promise<AuthResponse> {
        const user: User = {
            ...createUserInput,
            created_at: new Date(),
            updated_at: new Date(),
        };

        const saltOrRounds = 10;
        user.password = await bcrypt.hash(user.password, saltOrRounds);
        try {
            const result = await this.usersService.create(user);
            user._id = result._id;
            if (!result) return
            const payload: JwTPayload = {email: user.email, sub: user._id, permission: user.permission};

            return {
                token: this.jwtService.sign(payload),
                permissions: [user.permission],
            };
        } catch (e) {
            switch (e.code) {
                case 11000:
                    // throw new BadRequestException(e, 'Email exists already.')
                    throw new HttpException('Email exists already.', HttpStatus.CONFLICT)
            }
        }
    }

    async login(loginInput: LoginDto): Promise<AuthResponse> {
        const user = await this.usersService.findOneByEmail(loginInput.email);
        const payload: JwTPayload = {email: user.email, sub: user._id, permission: user.permission};
        return {
            token: this.jwtService.sign(payload),
            permissions: [user.permission],
        };
    }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(username);
        if (!user) return null;
        const passwordValid = await bcrypt.compare(password, user.password)
        if (!user) {
            throw new NotAcceptableException('Could not find the user');
        }
        if (user && passwordValid) {
            return user;
        }
        return null;
    }

    async changePassword(changePasswordInput: ChangePasswordDto,): Promise<CoreResponse> {
        console.log(changePasswordInput);

        return {
            success: true,
            message: 'Password change successful',
        };
    }

    async forgetPassword(forgetPasswordInput: ForgetPasswordDto,): Promise<CoreResponse> {
        console.log(forgetPasswordInput);

        return {
            success: true,
            message: 'Password change successful',
        };
    }

    async verifyForgetPasswordToken(verifyForgetPasswordTokenInput: VerifyForgetPasswordDto,): Promise<CoreResponse> {
        console.log(verifyForgetPasswordTokenInput);

        return {
            success: true,
            message: 'Password change successful',
        };
    }

    async resetPassword(resetPasswordInput: ResetPasswordDto,): Promise<CoreResponse> {
        console.log(resetPasswordInput);

        return {
            success: true,
            message: 'Password change successful',
        };
    }

    async socialLogin(socialLoginDto: SocialLoginDto): Promise<AuthResponse> {
        console.log(socialLoginDto);
        return {
            token: 'jwt token',
            permissions: ['super_admin', 'customer'],
        };
    }

    async otpLogin(otpLoginDto: OtpLoginDto): Promise<AuthResponse> {
        console.log(otpLoginDto);
        return {
            token: 'jwt token',
            permissions: ['super_admin', 'customer'],
        };
    }

    async verifyOtpCode(verifyOtpInput: VerifyOtpDto): Promise<CoreResponse> {
        console.log(verifyOtpInput);
        return {
            message: 'success',
            success: true,
        };
    }

    async sendOtpCode(otpInput: OtpDto): Promise<OtpResponse> {
        console.log(otpInput);
        return {
            message: 'success',
            success: true,
            _id: '1',
            provider: 'google',
            phone_number: '+919494949494',
            is_contact_exist: true,
        };
    }

    getTokenPayload(token: string): JwTPayload {
        const extractToken = token.replace('Bearer ', '');
        if (!extractToken) {
            throw new UnauthorizedException();
        }
        return this.jwtService.decode(extractToken) as JwTPayload;
    }

    // async getUsers({ text, first, page }: GetUsersArgs): Promise<UserPaginator> {
    //   const startIndex = (page - 1) * first;
    //   const endIndex = page * first;
    //   let data: User[] = this.users;
    //   if (text?.replace(/%/g, '')) {
    //     data = fuse.search(text)?.map(({ item }) => item);
    //   }
    //   const results = data.slice(startIndex, endIndex);
    //   return {
    //     data: results,
    //     paginatorInfo: paginate(data.length, page, first, results.length),
    //   };
    // }
    // public getUser(getUserArgs: GetUserArgs): User {
    //   return this.users.find((user) => user._id === getUserArgs._id);
    // }
    async me(token): Promise<User> {


        // Extract bearer
        const decoded = this.getTokenPayload(token);
        return this.usersService.findOne(decoded.sub);
    }

    // updateUser(id: string, updateUserInput: UpdateUserInput) {
    //   return `This action updates a #${id} user`;
    // }
}
