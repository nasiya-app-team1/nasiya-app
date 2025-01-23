import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/core/entities/admin.entity';
import { BaseService } from 'src/infrastructure/baseService/baseService';
import { DeepPartial } from 'typeorm';
import { BcryptService } from 'src/infrastructure/bcrypt/bcrypt.service';
import { Response } from 'express';
import { LoginAdminDto } from './dto/login-admin.dto';
import { AdminRepository } from 'src/core/repositories/admin.repository';
import { TokenService } from 'src/common/guard/jwt.service';

@Injectable()
export class AdminService extends BaseService<
  CreateAdminDto,
  DeepPartial<Admin>
> {
  constructor(
    @InjectRepository(Admin) repository: AdminRepository,
    private readonly hashService: BcryptService,
    private readonly tokenService: TokenService,
  ) {
    super(repository);
  }

  async createSuperAdmin(createAdminDto: CreateAdminDto) {
    const hash_password = await this.hashService.encrypt(
      createAdminDto.hashed_password,
    );
    createAdminDto.hashed_password = hash_password;
    await this.getRepository.save(createAdminDto);
    return {
      status_code: 201,
      message: 'super admin created',
      data: {},
    };
  }

  async createAdmin(createAdminDto: CreateAdminDto) {
    const { username, phone_number, email } = createAdminDto;
    const existingAdmin = await this.getRepository.findOne({
      where: [{ username }, { phone_number }, { email }],
    });
    if (existingAdmin) {
      if (username) {
        throw new ConflictException(`Username already exist`);
      }
      if (phone_number) {
        throw new ConflictException(`Phone number already exist`);
      }
      if (email) {
        throw new ConflictException(`Email address already exist`);
      }
    }
    const hash_password = await this.hashService.encrypt(
      createAdminDto.hashed_password,
    );
    await this.getRepository.save(hash_password);
    return {
      status_code: 201,
      message: 'success',
      data: {},
    };
  }

  async login(loginDto: LoginAdminDto, res: Response) {
    const { username, password } = loginDto;
    const user = await this.getRepository.findOne({ where: { username } });
    if (!user) {
      throw new BadRequestException('Username or password invalid');
    }
    const math_password = await this.hashService.compare(
      password,
      user.hashed_password,
    );
    if (!math_password) {
      throw new BadRequestException('Username or password invalid');
    }
    const payload = {
      id: user.id,
      role: user.role,
    };
    const access_token = this.tokenService.createAccessToken(payload);
    const refresh_token = this.tokenService.createRefreshToken(payload);

    this.writeToCookie(refresh_token, res);
    return {
      status_code: 200,
      message: 'success',
      data: {
        access_token,
        refresh_token,
      },
    };
  }

  async findOne(id: string) {
    const admin = await this.getRepository.findOneBy({ id });
    if (!admin) {
      throw new BadRequestException('Admin not found');
    }
    return {
      status_code: 200,
      message: 'success',
      data: { admin },
    };
  }

  async remove(id: string) {
    const admin = await this.getRepository.findOneBy({ id });
    if (!admin) {
      throw new BadRequestException('Admin not found');
    }
    await this.getRepository.delete(id);
    return {
      status_code: 200,
      message: 'success',
      data: {},
    };
  }

  async refreshToken(refresh_token: string) {
    const data = await this.tokenService.verifyRefreshToken(refresh_token);
    await this.findOneById(data?.id);
    const payload = {
      id: data.id,
      role: data.role,
    };
    const access_token = this.tokenService.createAccessToken(payload);
    return {
      status_code: 200,
      message: 'success',
      data: {
        token: access_token,
      },
    };
  }

  async logout(refresh_token: string, res: Response) {
    const data = await this.tokenService.verifyRefreshToken(refresh_token);
    await this.findOneById(data?.id);
    res.clearCookie('refresh_token_admin');
    return {
      status_code: 200,
      message: 'success',
      data: {},
    };
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    const admin = await this.getRepository.findOneBy({ id });
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    if (updateAdminDto?.hashed_password) {
      updateAdminDto.hashed_password = await this.hashService.encrypt(
        updateAdminDto.hashed_password,
      );
    }
    await this.getRepository.update(id, {
      ...updateAdminDto,
      updated_at: Date.now(),
    });
    return {
      status_code: 200,
      message: 'success',
      data: {},
    };
  }

  private async writeToCookie(refresh_token: string, res: Response) {
    try {
      res.cookie('refresh_token_admin', refresh_token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
    } catch (error) {
      throw new BadRequestException(`Error on write to cookie: ${error}`);
    }
  }
}
