import { AuthorizationModule } from './authorization/authorization.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeController } from './home/home.controller';
import { ConfigModule } from '@nestjs/config';
import { DashboardModule } from './dashboard/dashboard.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      port: Number(process.env.DB_PORT),
      host: process.env.DB_HOST,
      username:  process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASENAME,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthorizationModule,
    DashboardModule
  ],
  controllers: [HomeController],
  providers: [],
})
export class AppModule {

}
