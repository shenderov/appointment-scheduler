import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from '@users/services/users.service';
import { CreateUserDto } from '@shared-models/dtos/users/create-user.dto';
import { Role } from '@shared-models/enums/auth/role.enum';
import { User } from '@users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Roles } from '@auth/decorators/roles.decorator';
import { UserResponseDto } from '@shared-models/dtos/users/user-response.dto';

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
}
