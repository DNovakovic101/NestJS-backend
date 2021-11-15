import {LoginDto, TokenDto} from '../../../dto';
import {LoginService} from "../../../service/auth/login/login.service";
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

  constructor(
    private _loginService: LoginService
  ) {
  }

  @Post()
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  login(@Body() loginDto: LoginDto): Promise<TokenDto> {
    return this._loginService.login(loginDto);
  }

  @Post('refresh')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  refreshToken(@Body() tokenDto: TokenDto): Promise<TokenDto> {
    return this._loginService.refreshToken(tokenDto);
  }
}
