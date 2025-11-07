import React, { useState, useEffect } from 'react';
import { UserNotificationsDto } from '@shared-models/dtos/users/user-notifications.dto';
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Switch,
  FormControlLabel,
  Checkbox,
  Stack,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  getProfile,
  getNotifications,
  getPrivacySettings,
  updateProfile,
  updateNotifications,
  updatePrivacySettings,
} from '@api/users/settings';
import { changePassword } from '@api/auth/auth';
import { UserProfileDto } from '@shared-models/src/dtos/users/user-profile.dto';
import { ChangePasswordDto } from '@shared-models/src/dtos/auth/change-password.dto';
import { UserPrivacySettingsDto } from '@shared-models/src/dtos/users/user-privacy.dto';

const SectionDivider = () => <Divider sx={{ my: 4 }} />;

const AccountSettings = () => {
  const [profile, setProfile] = useState<UserProfileDto>({
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
  });

  const [passwords, setPasswords] = useState<ChangePasswordDto>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [passwordStatus, setPasswordStatus] = useState<string>('');

  const [notifications, setNotifications] = useState<UserNotificationsDto>({
    id: 0,
    emailNotifications: false,
    browserNotifications: false,
  });

  const [privacy, setPrivacy] = useState<UserPrivacySettingsDto>({
    id: 0,
    shareData: false,
    personalizedAds: false,
  });

  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);

  const loadAllSettings = async () => {
    setLoading(true);
    try {
      const [profileData, notificationsData, privacyData] = await Promise.all([
        getProfile(),
        getNotifications(),
        getPrivacySettings(),
      ]);
      setProfile(profileData);
      setNotifications(notificationsData);
      setPrivacy(privacyData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadAllSettings();
  }, []);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
    setPasswordStatus('');
  };

  const handleNotificationToggle = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const updatedNotifications = {
      ...notifications,
      [e.target.name]: e.target.checked,
    };
    const refreshedNotifications =
      await updateNotifications(updatedNotifications);
    setNotifications(refreshedNotifications);
  };

  const handlePrivacyToggle = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const updatedPrivacy = { ...privacy, [e.target.name]: e.target.checked };
    const result = await updatePrivacySettings(updatedPrivacy);
    setPrivacy(result);
  };

  const handleProfileSave = async () => {
    setSavingProfile(true);
    try {
      const refreshedProfile = await updateProfile(profile);
      setProfile(refreshedProfile);
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSave = async () => {
    if (
      !passwords.currentPassword ||
      !passwords.newPassword ||
      !passwords.confirmPassword
    ) {
      setPasswordStatus('Please fill in all password fields.');
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      setPasswordStatus('New password and confirmation do not match.');
      return;
    }
    try {
      await changePassword({
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
        confirmPassword: passwords.confirmPassword,
      });
      setPasswordStatus('Password changed successfully.');
      setPasswords({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error: unknown) {
      setPasswordStatus(
        (error as Error).message || 'Failed to change password.',
      );
    }
  };

  const handleDownloadData = () => {
    // TODO: Implement download data functionality
  };

  const handleDeleteAccount = () => {
    // TODO: Implement delete account functionality
  };

  const isPasswordChangeDisabled =
    !passwords.currentPassword ||
    !passwords.newPassword ||
    !passwords.confirmPassword ||
    passwords.newPassword !== passwords.confirmPassword;

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Account Settings
      </Typography>

      {/* Profile Information */}
      <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
        Profile Information
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="First Name"
          name="firstName"
          value={profile.firstName}
          onChange={handleProfileChange}
          fullWidth
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={profile.lastName}
          onChange={handleProfileChange}
          fullWidth
        />
        <TextField
          label="Email"
          name="email"
          value={profile.email}
          onChange={handleProfileChange}
          fullWidth
        />
        <Button
          variant="contained"
          onClick={() => void handleProfileSave()}
          disabled={savingProfile}
        >
          Save Profile
        </Button>
      </Stack>

      <SectionDivider />

      {/* Security */}
      <Typography variant="h6" sx={{ mb: 1 }}>
        Security
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Current Password"
          name="currentPassword"
          type="password"
          value={passwords.currentPassword}
          onChange={handlePasswordChange}
          fullWidth
        />
        <TextField
          label="New Password"
          name="newPassword"
          type="password"
          value={passwords.newPassword}
          onChange={handlePasswordChange}
          fullWidth
        />
        <TextField
          label="Confirm New Password"
          name="confirmPassword"
          type="password"
          value={passwords.confirmPassword}
          onChange={handlePasswordChange}
          fullWidth
        />
        {passwordStatus && (
          <Alert
            severity={
              passwordStatus === 'Password changed successfully.'
                ? 'success'
                : 'error'
            }
          >
            {passwordStatus}
          </Alert>
        )}
        <Button
          variant="contained"
          onClick={() => void handlePasswordSave()}
          disabled={isPasswordChangeDisabled}
        >
          Change Password
        </Button>
      </Stack>

      <SectionDivider />

      {/* Notifications */}
      <Typography variant="h6" sx={{ mb: 1 }}>
        Notifications
      </Typography>
      <Stack spacing={1}>
        <FormControlLabel
          control={
            <Switch
              checked={notifications.emailNotifications}
              onChange={(e) => void handleNotificationToggle(e)}
              name="emailNotifications"
            />
          }
          label="Email Notifications"
        />
        <FormControlLabel
          control={
            <Switch
              checked={notifications.browserNotifications}
              onChange={(e) => void handleNotificationToggle(e)}
              name="browserNotifications"
            />
          }
          label="Browser Notifications"
        />
      </Stack>

      <SectionDivider />

      {/* Privacy & Data */}
      <Typography variant="h6" sx={{ mb: 1 }}>
        Privacy & Data
      </Typography>
      <Stack spacing={1} mb={2}>
        <FormControlLabel
          control={
            <Checkbox
              checked={privacy.shareData}
              onChange={(e) => void handlePrivacyToggle(e)}
              name="shareData"
            />
          }
          label="Allow sharing my data with partners"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={privacy.personalizedAds}
              onChange={(e) => void handlePrivacyToggle(e)}
              name="personalizedAds"
            />
          }
          label="Enable personalized ads"
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <Button variant="outlined" onClick={handleDownloadData}>
          Download My Data
        </Button>
        <Button variant="contained" color="error" onClick={handleDeleteAccount}>
          Delete My Account
        </Button>
      </Stack>
    </Box>
  );
};

export default AccountSettings;
