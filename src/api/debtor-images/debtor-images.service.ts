import { Injectable } from '@nestjs/common';
import { CreateDebtorImageDto } from './dto/create-debtor-image.dto';
import { BaseService } from 'src/infrastructure/baseService/baseService';
import { DeepPartial } from 'typeorm';
import { DebtorImageEntity } from 'src/core/entity/debtor-image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DebtorImageRepository } from 'src/core/repository/debtorimage.repository';
import { FileService } from '../file-service/file-service.service';
import { FileFolder } from 'src/common/enum';

@Injectable()
export class DebtorImagesService extends BaseService<
  CreateDebtorImageDto,
  DeepPartial<DebtorImageEntity>
> {
  constructor(
    @InjectRepository(DebtorImageEntity) repository: DebtorImageRepository,
    private readonly fileService: FileService,
  ) {
    super(repository);
  }

  async createImage(
    createDto: CreateDebtorImageDto,
    file: Express.Multer.File,
  ) {
    const queryRunner =
      this.getRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const fileUrl = await this.fileService.saveFile(file, FileFolder.DEBTOR);
      const fileName = fileUrl.split('/')[3];

      const imageData = {
        image: fileName,
        ...createDto,
      };

      const image = await queryRunner.manager.save(
        this.getRepository.target,
        imageData,
      );

      await queryRunner.commitTransaction();

      return {
        status_code: 201,
        message: 'success',
        data: { image },
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async delete(id: string) {
    const queryRunner =
      this.getRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const image = await this.getRepository.findOneBy({ id });
      await this.fileService.deleteFile(image.image, FileFolder.DEBTOR);
      await this.getRepository.delete(id);

      await queryRunner.commitTransaction();

      return {
        status_code: 201,
        message: 'success',
        data: {},
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
