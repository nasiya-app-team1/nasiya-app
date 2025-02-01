import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { RefreshDto } from './dto/refresh_token-admin.dto';
import { AdminEntity, AdminRepository } from 'src/core';
import { BaseService, BcryptService } from 'src/infrastructure';
import { TokenService, RoleAdmin } from 'src/common/index.common';
import { PayDto } from './dto/pay.dto';
import { StoresService } from '../stores/stores.service';

@Injectable()
export class AdminService extends BaseService<
  CreateAdminDto,
  DeepPartial<AdminEntity>
> {
  constructor(
    @InjectRepository(AdminEntity) repository: AdminRepository,
    private readonly hashService: BcryptService,
    private readonly tokenService: TokenService,
    private readonly storeService: StoresService,
  ) {
    super(repository);
  }

  async createAdmin(createAdminDto: CreateAdminDto, adminRole: RoleAdmin) {
    const { username, phone_number, email } = createAdminDto;
    const usernameCondition = { username };
    const phoneNumberCondition = phone_number ? { phone_number } : null;
    const emailCondition = email ? { email } : null;

    const existingAdminByUsername = await this.getRepository.findOne({
      where: usernameCondition,
    });

    if (existingAdminByUsername) {
      throw new ConflictException(`Username already exists`);
    }

    if (phoneNumberCondition) {
      const existingAdminByPhoneNumber = await this.getRepository.findOne({
        where: phoneNumberCondition,
      });

      if (existingAdminByPhoneNumber) {
        throw new ConflictException(`Phone number already exists`);
      }
    }

    if (emailCondition) {
      const existingAdminByEmail = await this.getRepository.findOne({
        where: emailCondition,
      });

      if (existingAdminByEmail) {
        throw new ConflictException(`Email address already exists`);
      }
    }

    const hash_password = await this.hashService.encrypt(
      createAdminDto.hashed_password,
    );
    createAdminDto.hashed_password = hash_password;
    createAdminDto.role = adminRole;
    const { id, role, created_at } =
      await this.getRepository.save(createAdminDto);
    return {
      status_code: 201,
      message: 'Admin created',
      data: { id, role, created_at },
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
      message: 'Logged in',
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
    delete admin.hashed_password;
    return {
      status_code: 200,
      message: 'Success',
      data: admin,
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
      message: 'Deleted',
      data: { id },
    };
  }

  async refreshToken(refreshDto: RefreshDto) {
    const data = await this.tokenService.verifyRefreshToken(
      refreshDto.refresh_token,
    );
    const payload = {
      id: data.id,
      role: data.role,
    };
    const access_token = this.tokenService.createAccessToken(payload);
    return {
      status_code: 200,
      message: 'Token refreshed',
      data: {
        token: access_token,
      },
    };
  }

  async logout(refreshDto: RefreshDto, res: Response) {
    const data = await this.tokenService.verifyRefreshToken(
      refreshDto.refresh_token,
    );
    await this.findOneById(data?.id);
    res.clearCookie('refresh_token_admin');
    return {
      status_code: 200,
      message: 'Success',
      data: {},
    };
  }

  async pay(dto: PayDto) {
    const store = await this.storeService.getRepository.findOneBy({
      id: dto.store_id,
    });
    if (!store) {
      throw new BadRequestException('Store not found');
    }
    const data = { wallet: parseFloat(store.wallet) + dto.sum };
    await this.storeService.getRepository.update(dto.store_id, data);
    return {
      status_code: 200,
      message: 'Success',
      data: {
        id: dto.store_id,
      },
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
      updated_at: new Date(Date.now()),
    });
    const newAdmin = await this.getRepository.findOneBy({ id });
    delete newAdmin.hashed_password;
    return {
      status_code: 200,
      message: 'Updated',
      data: newAdmin,
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
