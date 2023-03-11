import { Module ,MiddlewareConsumer} from '@nestjs/common';
// import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthService } from './auth.service';
// import { CurrentUserInterceptor } from './interseptors/current-user.interceptor';
import { CurrentUserMiddleware } from '../../src/middlewares/current-user-middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    //thats how we setup globlely scoped interceptor
    // so now any request comes in any way our application
    // will have interceptor applied to it
    // {
    //   provide:APP_INTERCEPTOR,
    //  useClass: CurrentUserInterceptor,
    // }
  ],
})
export class UsersModule {
  configure(consumer:MiddlewareConsumer){
    consumer
    .apply(CurrentUserMiddleware)
    .forRoutes('*')
  }
}
