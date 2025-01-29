import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs/promises';
import { BaseService } from 'src/infrastructure/baseService/baseService';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { StoreEntity } from 'src/core/entity';
import { BcryptService } from 'src/infrastructure';
import { LoginStoreDto } from './dto/login-store.dto';
import { TokenService } from 'src/common/guard';
import { FileService } from '../file-service/file-service.service';
import { FileFolder } from 'src/common/enum';
import { DeleteStoreImageDto } from './dto/delete-image.dto';
import { UserRequest } from 'src/common/guard/request';

@Injectable()
export class StoresService extends BaseService<CreateStoreDto, StoreEntity> {
  private static readonly logger = new Logger(StoresService.name);
  constructor(
    @InjectRepository(StoreEntity)
    private readonly storeRepository: Repository<StoreEntity>,
    private readonly bcryptService: BcryptService,
    private readonly tokenService: TokenService,
    private readonly fileService: FileService,
  ) {
    super(storeRepository);
  }

  async createStore(createStoreDto: CreateStoreDto) {
    const { login, email, password } = createStoreDto;
    if (createStoreDto?.image) {
      const image = createStoreDto.image;
      try {
        const imageName = image.split('/')[3];
        const imagePath = process.cwd() + '/uploads/store/' + imageName;
        await fs.access(imagePath);
      } catch (error) {
        StoresService.logger.warn(error);
        throw new BadRequestException(`Invalid path: ${image}`);
      }
    }
    const existingStore = await this.getRepository.findOne({
      where: [{ login }, { email }],
    });
    if (existingStore) {
      throw new ConflictException('Store already exists');
    }

    createStoreDto.password = await this.bcryptService.encrypt(password);

    const store = await this.create(createStoreDto);
    const { id, created_at } = store.data;
    return {
      status_code: 201,
      message: 'Created',
      data: { id, created_at },
    };
  }

  async findAllStores() {
    const stores = (await this.findAll()).data;
    for (const store of stores) {
      delete store.pass_code;
      delete store.password;
    }
    return { status_code: 200, message: 'Success', data: stores };
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
      message: 'Logged in',
      data: { access_token: accessToken, refresh_token: refreshToken },
    };
  }

  async findStoreById(id: string) {
    const store = await this.getRepository.findOneBy({ id });
    if (!store) {
      throw new BadRequestException('Store not found');
    }
    delete store.password;
    delete store.pass_code;
    return {
      status_code: 201,
      message: 'Created',
      data: store,
    };
  }

  async updateStore(id: string, updateStoreDto: UpdateStoreDto) {
    const { password } = updateStoreDto;
    if (updateStoreDto?.image) {
      try {
        const imageName = updateStoreDto.image.split('/')[3];
        const imagePath = process.cwd() + '/uploads/store/' + imageName;
        await fs.access(imagePath);
      } catch (error) {
        StoresService.logger.warn(error);
        throw new BadRequestException(`Invalid path: ${updateStoreDto.image}`);
      }
    }
    const store = await this.getRepository.findOne({ where: { id } });
    if (!store) {
      throw new BadRequestException('Store not found');
    }

    if (password) {
      updateStoreDto.password = await this.bcryptService.encrypt(password);
    }

    const newStore = (await this.update(id, updateStoreDto)).data;
    delete newStore.password;
    delete newStore.pass_code;
    return {
      status_code: 200,
      message: 'Updated',
      data: newStore,
    };
  }

  async removeStore(id: string) {
    const store = await this.getRepository.findOne({ where: { id } });
    if (!store) {
      throw new BadRequestException('Store not found');
    }
    return await this.delete(id);
  }

  async upload(file: Express.Multer.File) {
    const queryRunner =
      this.storeRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const fileUrl = await this.fileService.saveFile(file, FileFolder.STORE);
      if (!fileUrl) {
        throw new Error('File could not be saved');
      }

      await queryRunner.commitTransaction();

      return {
        status_code: 201,
        message: 'Created',
        data: { path: fileUrl },
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return {
        status_code: 400,
        message: 'fail',
        data: { error },
      };
    } finally {
      await queryRunner.release();
    }
  }

  async deleteImage(dto: DeleteStoreImageDto) {
    const queryRunner =
      this.storeRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const imageName = dto.path.split('/')[3];
      await this.fileService.deleteFile(imageName, FileFolder.STORE);

      await queryRunner.commitTransaction();

      return {
        status_code: 200,
        message: 'Deleted',
        data: {},
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return {
        status_code: 200,
        message: 'fail',
        data: { error: error.response },
      };
    } finally {
      await queryRunner.release();
    }
  }

  async getWallet(id: string) {
    const store = await this.getRepository.findOne({ where: { id } });
    if (!store) {
      throw new BadRequestException('Store not found');
    }
    return {
      status_code: 200,
      message: 'Success',
      wallet: store.wallet,
    };
  }

  async getDebtorCount(id: string) {
    const store = await this.storeRepository
      .createQueryBuilder('store')
      .leftJoinAndSelect('store.debtors', 'debtor')
      .where('store.id = :id', { id })
      .loadRelationCountAndMap('store.debtorCount', 'store.debtors')
      .getOne();

    return {
      status_code: 200,
      storeId: store.id,
      storeName: store.full_name,
      debtorCount: store['debtorCount'],
    };
  }

  async getMonthlyDebt(id: UserRequest, start: Date, end: Date) {
    const result = await this.getRepository
      .createQueryBuilder('stores')
      .leftJoinAndSelect('stores.debtors', 'debtors')
      .leftJoinAndSelect('debtors.debts', 'debts')
      .where('debtors.store_id = :id', { id })
      .andWhere('debts.debt_date BETWEEN :start AND :end', { start, end })
      .getMany();
    let totalSum = 0;
    for (const store of result) {
      for (const debtor of store.debtors) {
        for (const debt of debtor.debts) {
          totalSum += debt.debt_sum / debt.debt_period;
          console.log(debt.debt_sum, debt.debt_period);
        }
      }
    }
    return {
      status_code: 200,
      message: 'Success',
      amount: totalSum,
    };
  }

  async getDailyDebtAndDebtors(id: string, date: Date | string) {
    console.log(date);

    const result = await this.getRepository
      .createQueryBuilder('stores')
      .leftJoinAndSelect('stores.debtors', 'debtors')
      .leftJoinAndSelect('debtors.debts', 'debts')
      .where('debtors.store_id = :id', { id })
      .andWhere('debts.debt_date = :date', { date })
      .getMany();

    let totalSum = 0;
    const debtors = {};
    for (const store of result) {
      for (const debtor of store.debtors) {
        const full_name = debtor.full_name;
        debtors[`${full_name}`] = 0;
        for (const debt of debtor.debts) {
          totalSum += debt.debt_sum / debt.debt_period;
          debtors[`${full_name}`] += debt.debt_sum / debt.debt_period;
        }
      }
    }
    return {
      status_code: 200,
      message: 'Success',
      amount: totalSum,
      debtors,
    };
  }

  async latePayments(id: string) {
    const debts = await this.getRepository
      .createQueryBuilder('stores')
      .leftJoin('stores.debtors', 'debtors')
      .leftJoin('debtors.debts', 'debts')
      .where('debtors.store_id = :id', { id })
      .select('debts.id', 'debt_id')
      .getRawMany();

    const debtIds = debts.map((d) => d.debt_id);
    return debtIds;
  }
}
