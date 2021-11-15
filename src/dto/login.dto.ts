import {IsEmail, IsNotEmpty, MaxLength, MinLength} from "class-validator";

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(250)
  email: string;

  @IsNotEmpty()
  @MaxLength(250)
  @MinLength(6)
  password: string;
}
