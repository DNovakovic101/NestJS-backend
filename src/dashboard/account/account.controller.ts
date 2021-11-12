import { JwtService } from '@nestjs/jwt';
import { AccountService } from './account.service';
import { Controller, Get, UseGuards, Headers, InternalServerErrorException, Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';

import { AccountDetailsDto } from 'src/_data/dtos/account-details.dto';
import { DashboardAuthGuard } from '../auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('account')
@ApiBearerAuth()
@Controller('dashboard/account')
@UseGuards(DashboardAuthGuard)
export class AccountController {
    constructor(private accountService: AccountService, private jwtServicce: JwtService,) { }
    
    @Get()
    async getAccountData(@Headers('Authorization') authorizationHeader: string): Promise<AccountDetailsDto> {
        try {
            return await this.accountService.getAccountData(this.getUserByAuthorizationHeader(authorizationHeader));
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    @Post('save-basedata')
    @UsePipes(ValidationPipe)
    async saveBaseData(@Body() data: AccountDetailsDto, @Headers('Authorization') authorizationHeader: string): Promise<number> {
        try {
            return await this.accountService.saveAccountData(data, this.getUserByAuthorizationHeader(authorizationHeader));
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    private getUserByAuthorizationHeader(authorizationHeader: string) {
        const decodetData = this.jwtServicce.decode(authorizationHeader.split(' ')[1]);
        return decodetData ? decodetData['userId'] : '';
    }
}
