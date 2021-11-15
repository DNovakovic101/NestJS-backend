import {JwtService} from '@nestjs/jwt';
import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Observable} from 'rxjs';

@Injectable()
export class DashboardGuard implements CanActivate {
  constructor(
    private _jwtService: JwtService
  ) {
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const jwtToken = req.headers['authorization']?.replace('Bearer ', '');

    try {
      this._jwtService.verify(
        jwtToken,
        {
          secret: process.env.JWT_SECRET_KEY
        }
      );

      return true;
    } catch (error) {
      return false;
    }
  }
}
