import {IsNotEmpty} from 'class-validator';

export class TokenDto {
  @IsNotEmpty()
  jwt: string;

  @IsNotEmpty()
  refresh: string;
}
