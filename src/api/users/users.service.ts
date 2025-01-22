import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { BcryptService } from 'src/infrastructure/bcrypt/bcrypt.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepositoroy } from 'src/core/repositories/user.repository';
import { User } from 'src/core/entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: UserRepositoroy,
    private readonly hashService: BcryptService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({
      email: createUserDto.email,
      username: createUserDto.username,
    });
    if (user) {
      throw new ConflictException(
        'User with this username or email already existis',
      );
    }
    const hashPassword = await this.hashService.encrypt(createUserDto.password);
    createUserDto.password = hashPassword;

    return await this.userRepository.save(createUserDto);
  }

  async login(loginDto: LoginUserDto) {
    const user = await this.userRepository.findOneBy({
      username: loginDto.username,
    });
    if (!user) {
      throw new ConflictException('Username or password not valid');
    }
    const checkPassword = await this.hashService.compare(
      loginDto.password,
      user.password,
    );
    if (!checkPassword) {
      throw new BadRequestException('Username or password not valid');
    }
    return {
      statusCode: 200,
      message: 'User logged in successfully',
      data: {},
    };
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async findOne(id: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new BadRequestException(`User not found with ${id} id`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new BadRequestException(`User not found with ${id} id`);
    }
    await this.userRepository.update(id, updateUserDto);
    return {
      statusCode: 200,
      message: 'User updated successfully',
      data: {},
    };
  }

  async remove(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new BadRequestException(`User not found with ${id} id`);
    }
    await this.userRepository.delete(id);
    return {
      statusCode: 200,
      message: 'User deleted successfully',
      data: {},
    };
  }
}
