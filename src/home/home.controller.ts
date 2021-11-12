import { JwtModule } from '@nestjs/jwt';
import { Controller, Get } from '@nestjs/common';

@Controller('')
export class HomeController {

    @Get()
    home(): string {
        return 'hello';
    }
}
