import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { StoreEntity } from 'src/core/entity';
import { BcryptService } from 'src/infrastructure';
import { LoginStoreDto } from './dto/login-store.dto';
import { TokenService } from 'src/common/guard';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(StoreEntity)
    private storeRepository: Repository<StoreEntity>,
    private readonly bcrypservice: BcryptService,
    private readonly tokenService: TokenService,
  ) {}
  async create(createStoreDto: CreateStoreDto) {
    const { password } = createStoreDto;
    const hashpassword = await this.bcrypservice.encrypt(password);
    const { login, email } = createStoreDto;
    const result = await this.storeRepository.findOne({
      where: { login, email },
    });
    if (result) {
      throw new ConflictException('Store already exists');
    }
    createStoreDto.password = hashpassword;
    const store = this.storeRepository.create(createStoreDto);
    await this.storeRepository.save(store);
    return {
      status_code: 201,
      message: 'success',
      data: { store },
    };
  }

  async login(loginDto: LoginStoreDto) {
    const store = await this.storeRepository.findOneBy({
      login: loginDto.login,
    });
    if (!store) {
      throw new BadRequestException('Login or password not valid');
    }
    const match_password = this.bcrypservice.compare(
      loginDto.password,
      store.password,
    );
    if (!match_password) {
      throw new BadRequestException('Login or password not valid');
    }
    const payload = {
      id: store.id,
    };
    const access_token = this.tokenService.createAccessToken(payload);
    const refresh_token = this.tokenService.createRefreshToken(payload);

    return {
      status_code: 200,
      message: 'success',
      data: { access_token, refresh_token },
    };
  }

  async findAll() {
    const stores = await this.storeRepository.find();
    return {
      status_code: 201,
      message: 'success',
      data: { stores },
    };
  }

  async findOne(id: string) {
    const store = await this.storeRepository.findOne({ where: { id } });
    if (!store) {
      throw new BadRequestException('Store not found');
    }
    return {
      status_code: 201,
      message: 'success',
      data: { store },
    };
  }

  async update(id: string, updateStoreDto: UpdateStoreDto) {
    const store = await this.storeRepository.findOne({ where: { id } });
    if (!store) {
      throw new BadRequestException('Store not found');
    }
    const { password } = updateStoreDto;
    if (password) {
      const hashpassword = await this.bcrypservice.encrypt(password);
      updateStoreDto.password = hashpassword;
    }

    const newStore = await this.storeRepository.update(id, updateStoreDto);
    return {
      status_code: 201,
      message: 'success',
      data: { newStore },
    };
  }

  async remove(id: string) {
    const store = await this.storeRepository.findOne({ where: { id } });
    if (!store) {
      throw new BadRequestException('Store not found');
    }
    await this.storeRepository.delete(id);
    return {
      status_code: 201,
      message: 'success',
      data: {},
    };
  }
}
