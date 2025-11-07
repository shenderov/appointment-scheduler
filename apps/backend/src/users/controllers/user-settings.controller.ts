import {
  Controller,
  Body,
  Get,
  UseGuards,
  Req,
  UnauthorizedException,
  Patch,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UserResponseDto } from '@shared-models/dtos/users/user-response.dto';
import { UserPrivacySettingsDto } from '@shared-models/dtos/users/user-privacy.dto';
import { UserSettingsService } from '@users/services/user-settings.service';
import { UserNotificationsDto } from '@shared-models/dtos/users/user-notifications.dto';

@Controller('users/settings')
export class UserSettingsController {
  constructor(private readonly userSettingsService: UserSettingsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/privacy')
  async getPrivacySettings(
    @Req() req: Request,
  ): Promise<UserPrivacySettingsDto> {
    const user = req.user as UserResponseDto;
    if (!user || !user.id) {
      throw new UnauthorizedException('User must be authenticated.');
    }
    return this.userSettingsService.getPrivacySettings(
      user.id as unknown as number,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/notifications')
  async getNotificationsSettings(
    @Req() req: Request,
  ): Promise<UserNotificationsDto> {
    const user = req.user as UserResponseDto;
    if (!user || !user.id) {
      throw new UnauthorizedException('User must be authenticated.');
    }
    return this.userSettingsService.getNotificationsSettings(
      user.id as unknown as number,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/privacy')
  async updatePrivacySettings(
    @Req() req: Request,
    @Body() privacySettings: UserPrivacySettingsDto,
  ): Promise<UserPrivacySettingsDto> {
    const user = req.user as UserResponseDto;
    if (!user || !user.id) {
      throw new UnauthorizedException('User must be authenticated.');
    }
    return this.userSettingsService.updatePrivacySettings(
      user.id as unknown as number,
      privacySettings,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/notifications')
  async updateNotificationsSettings(
    @Req() req: Request,
    @Body() notificationsSettings: UserNotificationsDto,
  ): Promise<UserNotificationsDto> {
    const user = req.user as UserResponseDto;
    if (!user || !user.id) {
      throw new UnauthorizedException('User must be authenticated.');
    }
    return this.userSettingsService.updateNotificationsSettings(
      user.id as unknown as number,
      notificationsSettings,
    );
  }
}
