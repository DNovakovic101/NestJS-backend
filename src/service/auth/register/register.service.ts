import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import {RegisterDto} from '../../../dto';
import {UserEntity, UserDetailEntity} from '../../../entity';
import {AccountTypeEnum} from "../../../enum";

@Injectable()
export class RegisterService {

  constructor(
    @InjectRepository(UserEntity) private _userRepository: Repository<UserEntity>,
    @InjectRepository(UserDetailEntity) private _userDetailRepository: Repository<UserDetailEntity>
  ) {
  }

  async register(registerDto: RegisterDto): Promise<number> {
    try {
      const newUser = new UserEntity();
      newUser.email = registerDto.email.toLocaleLowerCase();
      newUser.password = await bcrypt.hash(registerDto.password, 10);
      newUser.accountType = registerDto.accountType === AccountTypeEnum.BODY_SHOP ? AccountTypeEnum.BODY_SHOP : AccountTypeEnum.USER;

      const newUserDetailEntity = new UserDetailEntity();
      newUserDetailEntity.firstName = registerDto.userDetails.firstName;
      newUserDetailEntity.lastName = registerDto.userDetails.lastName;
      newUserDetailEntity.street = registerDto.userDetails.street;
      newUserDetailEntity.postalCode = registerDto.userDetails.postalCode;
      newUserDetailEntity.city = registerDto.userDetails.city;
      newUserDetailEntity.companyName = registerDto.userDetails.companyName;
      newUserDetailEntity.acceptANB = registerDto.userDetails.acceptANB;
      newUserDetailEntity.userEntity = newUser;


      await this._userRepository.save(newUser);
      await this._userDetailRepository.save(newUserDetailEntity);

      return newUser.id;
    } catch (e) {
      console.error(e);
      return -1;
    }
  }
}
