import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '@users/entities/user.entity';
import { LoginDto } from '@shared-models/dtos/auth/login.dto';
import { JwtPayload } from '@auth/jwt.strategy';
import { ChangePasswordDto } from '@shared-models/dtos/auth/change-password.dto';
import { SignUpDto } from '@shared-models/dtos/auth/sign-up.dto';
import { UsersService } from '@users/services/users.service';
import { CreateUserDto } from '@shared-models/dtos/users/create-user.dto';
import { Role } from '@shared-models/enums/auth/role.enum';
import { LoginResponseDto } from '@shared-models/dtos/auth/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  private signToken(user: User): string {
    const payload: JwtPayload = {
      sub: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      role: user.role,
      iat: user.passwordChangedAt?.getTime() || Date.now(),
    };
    return this.jwtService.sign(payload);
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isValid = await bcrypt.compare(loginDto.password, user.passwordHash);
    if (!isValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      access_token: this.signToken(user),
    };
  }

  async changePassword(
    userId: number,
    dto: ChangePasswordDto,
  ): Promise<{ message: string }> {
    if (dto.newPassword !== dto.confirmPassword) {
      throw new BadRequestException(
        "Confirm password doesn't match new password",
      );
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const isValid = await bcrypt.compare(
      dto.currentPassword,
      user.passwordHash,
    );
    if (!isValid)
      throw new BadRequestException('Current password is incorrect');

    user.passwordHash = await bcrypt.hash(dto.newPassword, 10);
    user.passwordChangedAt = new Date();

    await this.userRepository.save(user);
    return { message: 'Password updated successfully' };
  }

  async signup(dto: SignUpDto): Promise<LoginResponseDto> {
    const existingUser = await this.userRepository.findOneBy({
      email: dto.email,
    });
    if (existingUser) {
      throw new BadRequestException('Email is already in use');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user: CreateUserDto = {
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      password: hashedPassword,
      role: Role.CLIENT,
    };

    const newUser = await this.usersService.create(user);
    if (!newUser) {
      throw new InternalServerErrorException('Cannot create user');
    }
    return {
      access_token: this.signToken(newUser),
    };
  }
}
