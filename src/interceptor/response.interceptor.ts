import {CallHandler, ExecutionContext, NestInterceptor} from "@nestjs/common";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

export interface Response<T> {
  statusCode: number,
  data?: T
}

export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<Response<T>> | Promise<Observable<Response<T>>> {
    const statusCode = context.switchToHttp().getResponse().statusCode;
    return next
      .handle()
      .pipe(
        map(data => ({
          statusCode,
          data
        }))
      );
  }
}
