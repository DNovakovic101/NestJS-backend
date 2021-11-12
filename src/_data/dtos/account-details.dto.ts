import { IsInt, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";


export class AccountDetailsDto {
  id?: number;

  @IsNotEmpty()
  @IsString()
  firstname: string;
  
  @IsNotEmpty()
  @IsString()
  lastname: string;
  
  @IsNotEmpty()
  @IsString()
  street: string;
  
  @IsNotEmpty()
  @IsInt()
  @MinLength(4)
  @MaxLength(4)
  codePostale: string;
  
  @IsNotEmpty()
  @IsString()
  city: string;

  image?: Buffer;
}