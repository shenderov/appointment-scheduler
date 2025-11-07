import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Query,
  BadRequestException,
  UnauthorizedException,
  Req,
  Patch,
} from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from '@users/services/users.service';
import { CreateUserDto } from '@shared-models/dtos/users/create-user.dto';
import { Role } from '@shared-models/enums/auth/role.enum';
import { User } from '@users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Roles } from '@auth/decorators/roles.decorator';
import { UserResponseDto } from '@shared-models/dtos/users/user-response.dto';
import { UserProfileDto } from '@shared-models/dtos/users/user-profile.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() dto: CreateUserDto): Promise<User> {
    return this.usersService.create(dto);
  }

  @Get('/search')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN, Role.PROVIDER)
  async searchClients(
    @Query('query') query: string,
  ): Promise<UserResponseDto[]> {
    if (!query || query.length < 2) {
      throw new BadRequestException(
        'Query must be at least 2 characters long.',
      );
    }
    const users = await this.usersService.searchClients(query);
    return users ?? [];
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/profile')
  async getUserProfile(@Req() req: Request): Promise<UserProfileDto> {
    const user = req.user as UserResponseDto;
    if (!user || !user.id) {
      throw new UnauthorizedException('User must be authenticated.');
    }
    return this.usersService.getUserProfile(user.id as unknown as number);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/profile')
  async updateUserProfile(
    @Req() req: Request,
    @Body() profileData: UserProfileDto,
  ): Promise<UserProfileDto> {
    const user = req.user as UserResponseDto;
    if (!user || !user.id) {
      throw new UnauthorizedException('User must be authenticated.');
    }
    return this.usersService.updateUserProfile(
      user.id as unknown as number,
      profileData,
    );
  }
}
