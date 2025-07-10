import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '@auth/services/auth.service';
import { LoginDto } from '@auth/dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto): Promise<{ access_token: string }> {
    return this.authService.login(dto);
  }
}
