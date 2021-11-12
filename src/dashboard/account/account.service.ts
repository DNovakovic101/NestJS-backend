import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountDetailsDto } from 'src/_data/dtos/account-details.dto';
import { UserDetailEntity } from 'src/_data/entities/userdetail.entity';
import { Repository } from 'typeorm';


@Injectable()
export class AccountService {

    constructor(
        @InjectRepository(UserDetailEntity)
        private userDatailEntity: Repository<UserDetailEntity>
    ) {}

    async getAccountData(userId: number): Promise<AccountDetailsDto> {
        const e = await this.userDatailEntity.findOne({userEntityId: userId});      
        return {
            id: e.id,
            firstname: e.firstname,
            lastname: e.lastname,
            street: e.street,
            codePostale: e.code_postale,
            city: e.city,
            image: e.profile_image
        };
    }


    async saveAccountData(data: AccountDetailsDto, userId: number): Promise<number> {
        const e = await this.userDatailEntity.save({
            ...data, 
            userEntityId: userId,
            code_postale: data.codePostale
        });
        return e.id;
    }

}
