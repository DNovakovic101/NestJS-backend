import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {JwtModule} from '@nestjs/jwt';
import {LoginService} from '../../service/auth/login/login.service';
import {LoginController} from './login/login.controller';
import {RegisterService} from "../../service/auth/register/register.service";
import {UserDetailEntity, UserEntity} from "../../entity";
import {RegisterController} from "./register/register.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserDetailEntity]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET_KEY,
        signOptions: {
          algorithm: 'HS512',
          expiresIn: Number(process.env.JWT_TOKEN_EXPIRATION)
        }
      })
    })
  ],
  controllers: [LoginController, RegisterController],
  providers: [LoginService, RegisterService]
})
export class AuthModule {
}
