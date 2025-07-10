import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ServicesModule } from './services/services.module';
import { ProvidersModule } from './providers/providers.module';
import { AuthModule } from './auth/auth.module';
import { SeederModule } from './common/seeder/seeder.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'nest',
      entities: [__dirname + '/**/*.entity.{ts,js}'],
      synchronize: true, // ⚠️ dev only
    }),
    ProvidersModule,
    ServicesModule,
    SeederModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
