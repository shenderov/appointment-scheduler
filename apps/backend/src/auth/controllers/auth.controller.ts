import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from '@auth/services/auth.service';
import { LoginDto } from '@shared-models/dtos/auth/login.dto';
import { Request } from 'express';
import { OptionalJwtAuthGuard } from '@auth/guards/optional-jwt-auth.guard';
import { Role } from '@shared-models/enums/auth/role.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto): Promise<{ access_token: string }> {
    return this.authService.login(dto);
  }

  @Get('me')
  @UseGuards(OptionalJwtAuthGuard)
  getAuthenticatedUser(@Req() req: Request) {
    const user = req.user;
    if (!user) {
      return { name: 'Guest', role: Role.GUEST as Role };
    }
    return user;
  }
}
