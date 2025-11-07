import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { User } from '@users/entities/user.entity';
import { Role } from '@shared-models/enums/auth/role.enum';
import { CreateUserDto } from '@shared-models/dtos/users/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserResponseDto } from '@shared-models/dtos/users/user-response.dto';
import { plainToInstance } from 'class-transformer';
import { UserProfileDto } from '@shared-models/dtos/users/user-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const passwordHash: string = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({
      ...createUserDto,
      passwordHash,
    });
    return this.userRepository.save(user);
  }

  async getUserById(userId: number): Promise<User | null> {
    const user = this.userRepository.findOneBy({ id: userId });
    return user;
  }

  async searchClients(query: string): Promise<UserResponseDto[] | null> {
    const users = await this.userRepository.find({
      where: [
        { role: Role.CLIENT, firstName: ILike(`%${query}%`) },
        { role: Role.CLIENT, lastName: ILike(`%${query}%`) },
        { role: Role.CLIENT, email: ILike(`%${query}%`) },
      ],
      take: 10,
      select: ['id', 'firstName', 'lastName', 'email', 'role'],
    });
    return users.map((user) =>
      plainToInstance(UserResponseDto, {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        role: user.role,
      }),
    );
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserProfile(userId: number): Promise<UserProfileDto> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return plainToInstance(UserProfileDto, {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  }

  async updateUserProfile(
    userId: number,
    userProfile: UserProfileDto,
  ): Promise<UserProfileDto> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.email !== userProfile.email) {
      const existingUser = await this.userRepository.findOne({
        where: { email: userProfile.email },
      });
      if (existingUser && existingUser.id !== user.id) {
        throw new BadRequestException('Email is already in use');
      }
    }

    Object.assign(user, {
      firstName: userProfile.firstName ?? user.firstName,
      lastName: userProfile.lastName ?? user.lastName,
      email: userProfile.email ?? user.email,
    });

    const saved = await this.userRepository.save(user);
    return plainToInstance(UserProfileDto, {
      id: saved.id,
      firstName: saved.firstName,
      lastName: saved.lastName,
      email: saved.email,
    });
  }
}
