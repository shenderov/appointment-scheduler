import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { UserPrivacySettingsDto } from '@shared-models/dtos/users/user-privacy.dto';
import { UserSettings } from '@users/entities/user-settings.entity';
import { UserNotificationsDto } from '@shared-models/dtos/users/user-notifications.dto';
import { User } from '@users/entities/user.entity';

@Injectable()
export class UserSettingsService {
  constructor(
    @InjectRepository(UserSettings)
    private readonly userSettingsRepository: Repository<UserSettings>,
  ) {}

  private async getOrCreateSettings(userId: number): Promise<UserSettings> {
    let settings = await this.userSettingsRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!settings) {
      settings = this.userSettingsRepository.create({
        user: { id: userId } as User,
      });
      settings = await this.userSettingsRepository.save(settings);
    }

    return settings;
  }

  async getPrivacySettings(userId: number): Promise<UserPrivacySettingsDto> {
    const settings = await this.getOrCreateSettings(userId);
    return plainToInstance(UserPrivacySettingsDto, {
      id: settings.id,
      shareData: settings.shareData,
      personalizedAds: settings.personalizedAds,
    });
  }

  async getNotificationsSettings(
    userId: number,
  ): Promise<UserNotificationsDto> {
    const settings = await this.getOrCreateSettings(userId);
    return plainToInstance(UserNotificationsDto, {
      id: settings.id,
      emailNotifications: settings.emailNotifications,
      browserNotifications: settings.browserNotifications,
    });
  }

  async updatePrivacySettings(
    userId: number,
    privacySettings: UserPrivacySettingsDto,
  ): Promise<UserPrivacySettingsDto> {
    const settings = await this.getOrCreateSettings(userId);
    Object.assign(settings, privacySettings);
    const saved = await this.userSettingsRepository.save(settings);
    return plainToInstance(UserPrivacySettingsDto, {
      id: saved.id,
      shareData: saved.shareData,
      personalizedAds: saved.personalizedAds,
    });
  }

  async updateNotificationsSettings(
    userId: number,
    notificationsSettings: UserNotificationsDto,
  ): Promise<UserNotificationsDto> {
    const settings = await this.getOrCreateSettings(userId);
    Object.assign(settings, notificationsSettings);
    const saved = await this.userSettingsRepository.save(settings);
    return plainToInstance(UserNotificationsDto, {
      id: saved.id,
      emailNotifications: saved.emailNotifications,
      browserNotifications: saved.browserNotifications,
    });
  }
}
