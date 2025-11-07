import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '@auth/services/auth.service';
import { LoginDto } from '@shared-models/dtos/auth/login.dto';
import { Request } from 'express';
import { OptionalJwtAuthGuard } from '@auth/guards/optional-jwt-auth.guard';
import { Role } from '@shared-models/enums/auth/role.enum';
import { LoginResponseDto } from '@shared-models/dtos/auth/login-response.dto';
import { UserResponseDto } from '@shared-models/dtos/users/user-response.dto';
import { ChangePasswordDto } from '@shared-models/dtos/auth/change-password.dto';
import { AuthGuard } from '@nestjs/passport';
import { SignUpDto } from '@shared-models/dtos/auth/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(dto);
  }

  @Post('change-password')
  @UseGuards(AuthGuard('jwt'))
  async changePassword(
    @Req() req: Request,
    @Body() dto: ChangePasswordDto,
  ): Promise<{ message: string }> {
    const user = req.user as UserResponseDto;
    if (!user || !user.id) {
      throw new UnauthorizedException('User must be authenticated.');
    }
    await this.authService.changePassword(user.id, dto);
    return { message: 'Password changed successfully.' };
  }

  @Post('signup')
  async signup(@Body() dto: SignUpDto): Promise<LoginResponseDto> {
    return this.authService.signup(dto);
  }

  @Get('me')
  @UseGuards(OptionalJwtAuthGuard)
  getAuthenticatedUser(@Req() req: Request): UserResponseDto {
    const user = req.user as UserResponseDto | undefined;
    if (!user) {
      return {
        id: 0,
        name: 'Guest',
        email: '',
        role: Role.GUEST,
      };
    }
    return user;
  }
}
