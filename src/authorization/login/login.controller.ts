import { TokenDto } from '../../_data/dtos/token.dto';
import { LoginService } from './login.service';
import { LoginDto } from '../../_data/dtos/login.dto';
import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

@Controller('auth/login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Post()
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  login(@Body() loginDto: LoginDto): Promise<TokenDto> {
    return this.loginService.login(loginDto);
  }

  @Post('refresh')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  refreshToken(@Body() tokenDto: TokenDto): Promise<{ jwt: string }> {
    return this.loginService.refreshToken(tokenDto.jwt, tokenDto.refresh);
  }
}
