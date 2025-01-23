import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Stores } from 'src/core/entity/stores.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Stores)
    private storeRepository: Repository<Stores>,
  ) {}
  async create(createStoreDto: CreateStoreDto) {
    const { login } = createStoreDto;
    const result = await this.storeRepository.findOne({ where: { login } });
    if (result) {
      return 'Ushbu Store allaqachon mavjud';
    }
    const store = await this.storeRepository.create(createStoreDto);
    await this.storeRepository.save(store);
    return 'Store Muvaffaqiyatli yaratildi';
  }

  async findAll() {
    const result = await this.storeRepository.find();
    if (result.length) return result;
    return `Storelar topilmadi`;
  }

  async findOne(id: string) {
    const result = await this.storeRepository.findOne({ where: { id } });
    if (result) {
      return result;
    }
    return 'Store topilmadi';
  }

  async update(id: string, updateStoreDto: UpdateStoreDto) {
    const result = await this.storeRepository.findOne({ where: { id } });
    if (result) {
      await this.storeRepository.update(id, updateStoreDto);
      return 'Store yangilandi';
    }
    return `Yangilanadigan Store topilmadi`;
  }

  async remove(id: string) {
    const result = await this.storeRepository.findOne({ where: { id } });
    if (result) {
      await this.storeRepository.delete(id);
      return "Store o'chirildi";
    }
    return `O'chiriladigan Store topilmadi`;
  }
}
