import { HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IFindOptions } from './interface';
import { RepositoryPager } from '../pagination/RepositoryParget';

export class BaseService<CreateDto, Entity> {
  constructor(protected readonly repository: Repository<any>) {}

  get getRepository() {
    return this.repository;
  }

  async create(dto: CreateDto) {
    let created_data = this.repository.create({
      ...dto,
    }) as unknown as Entity;
    created_data = await this.repository.save(created_data);
    return {
      status_code: 201,
      message: 'Created',
      data: created_data,
    };
  }

  async findAll(options?: IFindOptions<Entity>) {
    const data = (await this.repository.find({
      ...options,
    })) as Entity[];
    return {
      status_code: 200,
      message: 'Success',
      data: data,
    };
  }

  async findAllWithPagination(options?: IFindOptions<Entity>) {
    return await RepositoryPager.findAll(
      this.getRepository,
      'Success',
      options,
    );
  }

  async findOneBy(options: IFindOptions<Entity>) {
    const data = (await this.repository.findOne({
      select: options.select || {},
      relations: options.relations || [],
      where: options.where,
    })) as Entity;
    if (!data) {
      throw new HttpException('Not found', 404);
    }
    return {
      status_code: 200,
      message: 'Success',
      data: data,
    };
  }

  async findOneById(id: string, options?: IFindOptions<Entity>) {
    const data = (await this.repository.findOne({
      select: options?.select || {},
      relations: options?.relations || [],
      where: { id, ...options?.where },
    })) as unknown as Entity;
    if (!data) {
      throw new HttpException('Not found', 404);
    }
    return {
      status_code: 200,
      message: 'Success',
      data,
    };
  }

  async update(id: string, dto: Partial<CreateDto>) {
    await this.repository.update(id, {
      ...dto,
      updated_at: new Date(Date.now()),
    });
    const newData = await this.repository.findOneBy({ id });
    return {
      status_code: 200,
      message: 'Updated',
      data: newData,
    };
  }

  async delete(id: string) {
    (await this.repository.delete(id)) as unknown as Entity;
    return {
      status_code: 200,
      message: 'Deleted',
      data: { id },
    };
  }
}
