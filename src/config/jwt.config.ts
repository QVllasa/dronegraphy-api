import {JwtModuleAsyncOptions} from '@nestjs/jwt';
import process from "process";

export const jwtConfig: JwtModuleAsyncOptions = {
    useFactory: () => {
        return {
            secret: process.env.JWT_SECRET,
            signOptions: {expiresIn: '60s'},
        }
    }
}
