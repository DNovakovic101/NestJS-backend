import { IsNotEmpty } from 'class-validator';
import { AccountType } from '../models/accounttype.model';
import { AccountDetailsDto } from './account-details.dto';
import { LoginDto } from './login.dto';

export class RegistrationDto extends LoginDto {
  @IsNotEmpty()
  accountDetails: AccountDetailsDto;

  @IsNotEmpty()
  accountType: AccountType;
}
