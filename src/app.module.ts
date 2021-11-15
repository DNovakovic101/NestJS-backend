import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {HomeController} from './controller/home/home.controller';
import {ConfigModule} from '@nestjs/config';
import {DashboardModule} from './controller/dashboard/dashboard.module';
import {AuthModule} from "./controller/auth/auth.module";
import {APP_INTERCEPTOR} from "@nestjs/core";
import {ResponseInterceptor} from "./interceptor/response.interceptor";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      port: Number(process.env.DB_PORT),
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASENAME,
      autoLoadEntities: true,
      synchronize: true
    }),
    AuthModule,
    DashboardModule
  ],
  controllers: [HomeController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor
    }
  ],
})
export class AppModule {
}
