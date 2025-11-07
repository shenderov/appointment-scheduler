import api from '@api/client';
import type { UserProfileDto } from '@shared-models/dtos/users/user-profile.dto';
import type { UserNotificationsDto } from '@shared-models/dtos/users/user-notifications.dto';
import type { UserPrivacySettingsDto } from '@shared-models/dtos/users/user-privacy.dto';

export const updateProfile = async (
  payload: UserProfileDto,
): Promise<UserProfileDto> => {
  const res = await api.patch<UserProfileDto>('/users/profile', payload);
  return res.data;
};

export const updateNotifications = async (
  payload: UserNotificationsDto,
): Promise<UserNotificationsDto> => {
  const res = await api.patch<UserNotificationsDto>(
    '/users/settings/notifications',
    payload,
  );
  return res.data;
};

export const updatePrivacySettings = async (
  payload: UserPrivacySettingsDto,
): Promise<UserPrivacySettingsDto> => {
  const res = await api.patch<UserPrivacySettingsDto>(
    '/users/settings/privacy',
    payload,
  );
  return res.data;
};

export const getProfile = async (): Promise<UserProfileDto> => {
  const res = await api.get<UserProfileDto>('/users/profile');
  return res.data;
};

export const getNotifications = async (): Promise<UserNotificationsDto> => {
  const res = await api.get<UserNotificationsDto>(
    '/users/settings/notifications',
  );
  return res.data;
};

export const getPrivacySettings = async (): Promise<UserPrivacySettingsDto> => {
  const res = await api.get<UserPrivacySettingsDto>('/users/settings/privacy');
  return res.data;
};
