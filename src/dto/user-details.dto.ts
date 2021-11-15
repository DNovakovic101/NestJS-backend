import {IsBoolean, IsNotEmpty, IsOptional, IsString, Length, Matches} from "class-validator";

export class UserDetailsDto {
  id?: number;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsString()
  @IsOptional()
  street?: string;

  @IsString()
  @IsOptional()
  companyName?: string;

  @IsBoolean()
  acceptANB: boolean;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[0-9]*$/, {message: 'postalCode must be digit'})
  @Length(4, 4)
  postalCode: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  image?: Buffer;
}
