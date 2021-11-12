import { UserEntity } from '../_data/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from './account/account.controller';
import { AccountService } from './account/account.service';
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
  controllers: [AccountController],
  providers: [AccountService]
})
export class DashboardModule { }
