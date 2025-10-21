import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginResponseDto {
  access_token!: string;
}
