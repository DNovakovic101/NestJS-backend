import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';


@Injectable()
export class DashboardAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const jwtToken = req.headers['authorization']?.replace('Bearer ', '');

    try {
      const res = this.jwtService.verify(jwtToken, {
        secret: process.env.JWT_SECRET_KEY,
      });
      const userId = res?.userId;
      return true;
    } catch (err) {
      return false;
    }
  }
}
