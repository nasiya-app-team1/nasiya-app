import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial } from 'typeorm';
import { BaseService } from 'src/infrastructure/baseService/baseService';
import { CreateDebtsImageDto } from './dto/create-debts-image.dto';
import { DebtImageEntity } from 'src/core/entity/debt-image.entity';
import { DebtImageRepository } from 'src/core';
import { FileService } from '../file-service/file-service.service';
import { FileFolder } from 'src/common/enum';

@Injectable()
export class DebtsImagesService extends BaseService<
  CreateDebtsImageDto,
  DeepPartial<DebtImageEntity>
> {
  constructor(
    @InjectRepository(DebtImageEntity) repository: DebtImageRepository,
    private readonly fileService: FileService,
  ) {
    super(repository);
  }

  async createImage(dto: CreateDebtsImageDto, file: Express.Multer.File) {
    const queryRunner =
      this.getRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const fileUrl = await this.fileService.saveFile(file, FileFolder.DEBT);
      const fileName = fileUrl.split('/')[3];

      const imageData = {
        image: fileName,
        ...dto,
      };

      const image = await queryRunner.manager.save(
        this.getRepository.target,
        imageData,
      );

      await queryRunner.commitTransaction();

      return {
        status_code: 201,
        message: 'success',
        data: image,
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
      await this.fileService.deleteFile(image.image, FileFolder.DEBT);
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
