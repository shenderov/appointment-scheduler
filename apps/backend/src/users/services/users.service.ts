import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { User } from '@users/entities/user.entity';
import { Role } from '@shared-models/enums/auth/role.enum';
import { CreateUserDto } from '@shared-models/dtos/users/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserResponseDto } from '@shared-models/dtos/users/user-response.dto';
import { plainToInstance } from 'class-transformer';

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
        { role: Role.CLIENT, name: ILike(`%${query}%`) },
        { role: Role.CLIENT, email: ILike(`%${query}%`) },
      ],
      take: 10,
      select: ['id', 'name', 'email', 'role'],
    });
    return users.map((user) =>
      plainToInstance(UserResponseDto, {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      }),
    );
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}
