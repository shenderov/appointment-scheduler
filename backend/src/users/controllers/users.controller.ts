import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/user.entity';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { OptionalJwtAuthGuard } from '@auth/guards/optional-jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() dto: CreateUserDto): Promise<User> {
    return this.usersService.create(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('me')
  @UseGuards(OptionalJwtAuthGuard)
  getAuthenticatedUser(@Req() req: Request) {
    const user = req.user;
    if (!user) {
      return { name: 'Guest', role: 'guest' };
    }
    return user;
  }
}
