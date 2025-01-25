import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from 'src/infrastructure/baseService/baseService';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { StoreEntity } from 'src/core/entity';
import { BcryptService } from 'src/infrastructure';
import { LoginStoreDto } from './dto/login-store.dto';
import { TokenService } from 'src/common/guard';

@Injectable()
export class StoresService extends BaseService<CreateStoreDto, StoreEntity> {
  constructor(
    @InjectRepository(StoreEntity)
    private readonly storeRepository: Repository<StoreEntity>,
    private readonly bcryptService: BcryptService,
    private readonly tokenService: TokenService,
  ) {
    super(storeRepository);
  }

  async createStore(createStoreDto: CreateStoreDto) {
    const { login, email, password } = createStoreDto;

    const existingStore = await this.getRepository.findOne({
      where: [{ login }, { email }],
    });
    if (existingStore) {
      throw new ConflictException('Store already exists');
    }

    createStoreDto.password = await this.bcryptService.encrypt(password);
    const store=this.storeRepository.create(createStoreDto)
    await this.storeRepository.save(createStoreDto)
    // return await this.create(createStoreDto);
    return "ok";
  }

  async loginStore(loginDto: LoginStoreDto) {
    const { login, password } = loginDto;

    const store = await this.getRepository.findOne({
      where: { login },
    });
    if (!store) {
      throw new BadRequestException('Login or password not valid');
    }

    const isPasswordMatch = await this.bcryptService.compare(
      password,
      store.password,
    );
    if (!isPasswordMatch) {
      throw new BadRequestException('Login or password not valid');
    }

    const payload = { id: store.id };
    const accessToken = this.tokenService.createAccessToken(payload);
    const refreshToken = this.tokenService.createRefreshToken(payload);

    return {
      status_code: 200,
      message: 'success',
      data: { access_token: accessToken, refresh_token: refreshToken },
    };
  }

  async findStoreById(id: string) {
    const store = await this.findOneById(id);
    if (!store) {
      throw new BadRequestException('Store not found');
    }
    return store;
  }

  async updateStore(id: string, updateStoreDto: UpdateStoreDto) {
    const { password } = updateStoreDto;

    const store = await this.getRepository.findOne({ where: { id } });
    if (!store) {
      throw new BadRequestException('Store not found');
    }

    if (password) {
      updateStoreDto.password = await this.bcryptService.encrypt(password);
    }

    return await this.update(id, updateStoreDto);
  }

  async removeStore(id: string) {
    const store = await this.getRepository.findOne({ where: { id } });
    if (!store) {
      throw new BadRequestException('Store not found');
    }
    return await this.delete(id);
  }
}
