import { RegistartionService } from './registration.service';
import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { RegistrationDto } from 'src/_data/dtos/registration.dto';

@Controller('auth/registration')
export class RegistrationController {

  constructor(private registrationService: RegistartionService) { }

  @Post()
  @UsePipes(ValidationPipe)
  addUser(@Body() data: RegistrationDto): Promise<number> {
    return this.registrationService.register(data);
  }
}
