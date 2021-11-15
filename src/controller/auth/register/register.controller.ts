import {Body, Controller, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {RegisterService} from "../../../service/auth/register/register.service";
import {RegisterDto} from "../../../dto";

@Controller('auth/register')
export class RegisterController {

  constructor(
    private _registerService: RegisterService
  ) {
  }

  @Post()
  @UsePipes(ValidationPipe)
  addUser(@Body() data: RegisterDto): Promise<number> {
    return this._registerService.register(data);
  }
}
