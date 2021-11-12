import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { RegistrationDto } from './../../_data/dtos/registration.dto';
import { UserDetailEntity } from './../../_data/entities/userdetail.entity';
import { UserEntity } from './../../_data/entities/user.entity';
import { AccountType } from 'src/_data/models/accounttype.model';

@Injectable()
export class RegistartionService {

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(UserDetailEntity)
        private userDetailRepository: Repository<UserDetailEntity>
    ) { }

    async register(data: RegistrationDto): Promise<number> {
        const userEntity = new UserEntity();

        let accType;
        switch(data.accountType) {
            case AccountType.user:
                accType = AccountType.user;
                break;
            case AccountType.body_shop:
                accType = AccountType.body_shop;
                break;
            default: 
                accType = AccountType.user;
        }
        userEntity.email = data.email.toLocaleLowerCase();
        userEntity.password = await bcrypt.hash(data.password, 10);
        userEntity.account_type = accType;

        const user = await this.userRepository.save(userEntity);

        const userDetailEntity = new UserDetailEntity();
        userDetailEntity.firstname = data.accountDetails.firstname;
        userDetailEntity.lastname = data.accountDetails.lastname;
        userDetailEntity.street = data.accountDetails.street;
        userDetailEntity.code_postale = data.accountDetails.codePostale;
        userDetailEntity.city = data.accountDetails.city;
        userDetailEntity.userEntity = user;

        await this.userDetailRepository.save(userDetailEntity);
        return user.id;
    }

}
