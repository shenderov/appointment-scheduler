import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@users/entities/user.entity';
import { CreateUserDto } from '@shared/models/dtos';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserResponseDto } from '@shared/models/dtos';

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

  async getUserById(userId: string): Promise<User | null> {
    const user = this.userRepository.findOneBy({ id: userId });

    // if
    //   ...createUserDto,
    //   passwordHash,
    // });
    return user;
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}
