import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from '@users/controllers/users.controller';
import { UsersService } from '@users/services/users.service';
import { User } from '@users/entities/user.entity';
import { AuthModule } from '@auth/auth.module';
import { UserSettingsController } from '@users/controllers/user-settings.controller';
import { UserSettingsService } from '@users/services/user-settings.service';
import { UserSettings } from '@users/entities/user-settings.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserSettings]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController, UserSettingsController],
  providers: [UsersService, UserSettingsService],
  exports: [UsersService, UserSettingsService],
})
export class UsersModule {}
