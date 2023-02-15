import {PartialType, PickType} from '@nestjs/swagger';
import {CoreMutationOutput} from 'src/common/dto/core-mutation-output.dto';
import {User} from 'src/users/entities/user.entity';

export enum Permission {
  SUPER_ADMIN = 'super_admin',
  STORE_OWNER = 'store_owner',
  STAFF = 'staff',
  CUSTOMER = 'customer',
}

export class RegisterDto extends PickType(User, ['name', 'email', 'password']) {
  permission: Permission;
}

export class LoginDto extends PartialType(
    PickType(User, ['email', 'password']),
) {
}

export class SocialLoginDto {
  provider: string;
  access_token: string;
}

export class ChangePasswordDto {
  oldPassword: string;
  newPassword: string;
}

export class ForgetPasswordDto {
  email: string;
}

export class VerifyForgetPasswordDto {
  email: string;
  token: string;
}

export class ResetPasswordDto {
  email: string;
  token: string;
  password: string;
}

export class AuthResponse {
  token: string;
  permissions: string[];
}

export class CoreResponse extends CoreMutationOutput {
}

export class VerifyOtpDto {
  otp_id: string;
  code: string;
  phone_number: string;
}

export class OtpResponse {
_id: string;
  message: string;
  success: boolean;
  phone_number: string;
  provider: string;
  is_contact_exist: boolean;
}

export class OtpDto {
  phone_number: string;
}

export class OtpLoginDto {
  otp_id: string;
  code: string;
  phone_number: string;
  name?: string;
  email?: string;
}
