import {JwtService} from '@nestjs/jwt';
import {AccountService} from '../../../service/dashboard/account/account.service';
import {
  Controller,
  Get,
  Headers,
  InternalServerErrorException,
  Post,
  UsePipes,
  ValidationPipe,
  Body, BadRequestException, UseGuards
} from '@nestjs/common';

import {UserDetailsDto} from 'src/dto/user-details.dto';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {UserDetailEntity} from "../../../entity";
import {DashboardGuard} from "../dashboard.guard";

@ApiTags('account')
@ApiBearerAuth()
@UseGuards(DashboardGuard)
@Controller('dashboard/account')
export class AccountController {
  constructor(
    private _accountService: AccountService,
    private _jwtService: JwtService
  ) {
  }

  @Get()
  async getAccountData(@Headers('Authorization') authorizationHeader: string): Promise<UserDetailEntity> {
    return this._accountService.getAccountData(this._getUserIdFromAuthorizationHeader(authorizationHeader));
  }

  @Post('save-basedata')
  @UsePipes(ValidationPipe)
  async saveBaseData(@Body() data: UserDetailsDto, @Headers('Authorization') authorizationHeader: string): Promise<number> {
    try {
      return await this._accountService.saveAccountData(data, this._getUserIdFromAuthorizationHeader(authorizationHeader));
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  private _getUserIdFromAuthorizationHeader(authorizationHeader: string) {
    if (authorizationHeader == null || !authorizationHeader.startsWith('Bearer')) {
      throw new BadRequestException('Authorization header missing');
    }

    const decodedData = this._jwtService.decode(authorizationHeader.replace('Bearer ', ''));
    return decodedData ? decodedData['userId'] : '';
  }
}
