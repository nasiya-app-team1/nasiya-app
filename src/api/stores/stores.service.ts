import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StoreEntity } from 'src/core/entities/stores.entity';
import { Repository } from 'typeorm';
import { BcryptService } from 'src/infrastructure/bcrypt/bcrypt.service';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(StoreEntity)
    private storeRepository: Repository<StoreEntity>,
    private readonly bcrypservice: BcryptService,
  ) {}
  async create(createStoreDto: CreateStoreDto) {
    const { password } = createStoreDto;
    const hashpassword = await this.bcrypservice.encrypt(password);
    const { login, email } = createStoreDto;
    const result = await this.storeRepository.findOne({
      where: { login, email },
    });
    if (result) {
      return 'Ushbu StoreEntity allaqachon mavjud';
    }
    createStoreDto.password = hashpassword;
    const store = await this.storeRepository.create(createStoreDto);
    await this.storeRepository.save(store);
    return 'StoreEntity Muvaffaqiyatli yaratildi';
  }

  async findAll() {
    const result = await this.storeRepository.find();
    if (result) return result;
    return `Storelar topilmadi`;
  }

  async findOne(id: string) {
    const result = await this.storeRepository.findOne({ where: { id } });
    if (result) {
      return result;
    }
    return 'StoreEntity topilmadi';
  }

  async update(id: string, updateStoreDto: UpdateStoreDto) {
    const result = await this.storeRepository.findOne({ where: { id } });
    const { password } = updateStoreDto;
    if (password) {
      const hashpassword = await this.bcrypservice.encrypt(password);
      updateStoreDto.password = hashpassword;
    }
    if (result) {
      await this.storeRepository.update(id, updateStoreDto);
      return 'StoreEntity yangilandi';
    }
    return `Yangilanadigan StoreEntity topilmadi`;
  }

  async remove(id: string) {
    const result = await this.storeRepository.findOne({ where: { id } });
    if (result) {
      await this.storeRepository.delete(id);
      return "StoreEntity o'chirildi";
    }
    return `O'chiriladigan StoreEntity topilmadi`;
  }
}
