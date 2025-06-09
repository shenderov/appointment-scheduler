import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, UsersModule, TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'nest',
  entities: [__dirname + '/**/*.entity.{ts,js}'],
  synchronize: true, // ⚠️ dev only
    }),
    UsersModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
