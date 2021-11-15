import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UserDetailEntity} from "../../../entity";
import {UserDetailsDto} from "../../../dto";

@Injectable()
export class AccountService {

  constructor(
    @InjectRepository(UserDetailEntity)
    private _userDetailRepository: Repository<UserDetailEntity>
  ) {
  }

  async getAccountData(userId: number): Promise<UserDetailEntity> {
    const userDetails = await this._userDetailRepository.findOne({userEntity: {id: userId}});

    if (!userDetails) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    return userDetails;
  }

  // TODO: improve this method when all account details are clear
  async saveAccountData(userDetailsDto: UserDetailsDto, userId: number): Promise<number> {
    const e = await this._userDetailRepository.save({
      ...userDetailsDto,
      userEntityId: userId,
      postalCode: userDetailsDto.postalCode
    });
    return e.id;
  }
}
