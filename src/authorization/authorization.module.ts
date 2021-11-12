import { UserEntity } from '../_data/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { RegistartionService } from './registration/registration.service';
import { LoginService } from './login/login.service';
import { LoginController } from './login/login.controller';
import { RegistrationController } from './registration/registration.controller';
import { UserDetailEntity } from 'src/_data/entities/userdetail.entity';


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
    controllers: [LoginController, RegistrationController],
    providers: [LoginService, RegistartionService]
})
export class AuthorizationModule {
}
