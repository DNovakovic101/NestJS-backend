import {IsNotEmpty, ValidateNested} from "class-validator";
import {AccountTypeEnum} from "../enum";
import {LoginDto} from "./login.dto";
import {UserDetailsDto} from "./user-details.dto";
import {Type} from "class-transformer";

export class RegisterDto extends LoginDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UserDetailsDto)
  userDetails: UserDetailsDto;

  @IsNotEmpty()
  accountType: AccountTypeEnum;
}
