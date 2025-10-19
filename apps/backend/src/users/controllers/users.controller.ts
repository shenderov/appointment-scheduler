import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UsersService } from '@users/services/users.service';
import { CreateUserDto } from '@shared-models/dtos/users/create-user.dto';
import { User } from '@users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

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
}
