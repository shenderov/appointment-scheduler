import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '@auth/dtos/login.dto';
import { Repository } from 'typeorm';
import { User } from '@users/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  signToken(user: {
    id: string;
    name: string;
    email: string;
    role: string;
  }): string {
    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!user) throw new NotFoundException('User not found');

    const isValid: boolean = await bcrypt.compare(
      loginDto.password,
      user.passwordHash,
    );
    if (!isValid) throw new UnauthorizedException('Invalid password');

    const payload = {
      email: user.email,
      name: user.name,
      sub: user.id,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
