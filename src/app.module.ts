import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './users/users.entity';
import { FriendEntity } from './users/friend.entity';

const {DB_USER, DB_NAME ,DB_HOST,DB_PASS,DB_PORT} = process.env;
console.log(DB_USER, DB_NAME ,DB_HOST,DB_PASS,DB_PORT)
@Module({
  imports: [
             AuthModule,
             UsersModule,
             TypeOrmModule.forRoot({
              type: 'postgres',
              host: DB_HOST,
              port: parseInt(DB_PORT),
              username: DB_USER,
              password: DB_PASS,
              database: DB_NAME,
              entities: [UsersEntity, FriendEntity],
              synchronize: true,
            }),
          
            ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
