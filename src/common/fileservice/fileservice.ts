import { Injectable, BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { resolve, join, extname } from 'path';
import { existsSync, mkdirSync, unlink, writeFile } from 'fs';

@Injectable()
export class FileService {
  private readonly baseUploadPath = resolve(__dirname, '..', '..', 'uploads');

  constructor() {
    if (!existsSync(this.baseUploadPath)) {
      mkdirSync(this.baseUploadPath, { recursive: true });
    }
  }

  private getFolderPath(folder: 'debtor' | 'debts' | 'stores'): string {
    const folderPath = join(this.baseUploadPath, folder);
    if (!existsSync(folderPath)) {
      mkdirSync(folderPath, { recursive: true });
    }
    return folderPath;
  }

  async createFile(
    folder: 'debtor' | 'debts' | 'stores',
    file: Express.Multer.File,
  ): Promise<string> {
    try {
      const ext = extname(file.originalname).toLowerCase();
      const fileName = `${uuidv4()}${ext}`;
      const folderPath = this.getFolderPath(folder);
      const filePath = join(folderPath, fileName);

      await new Promise<void>((resolve, reject) => {
        writeFile(filePath, file.buffer, (err) => {
          if (err) return reject(err);
          resolve();
        });
      });

      return `/uploads/${folder}/${fileName}`;
    } catch (error) {
      throw new BadRequestException(`Error creating file: ${error.message}`);
    }
  }

  async deleteFile(
    folder: 'debtor' | 'debts' | 'stores',
    fileName: string,
  ): Promise<void> {
    try {
      const folderPath = this.getFolderPath(folder);
      const filePath = join(folderPath, fileName);

      if (!existsSync(filePath)) {
        throw new BadRequestException(`File not found: ${fileName}`);
      }

      await new Promise<void>((resolve, reject) => {
        unlink(filePath, (err) => {
          if (err) return reject(err);
          resolve();
        });
      });
    } catch (error) {
      throw new BadRequestException(`Error deleting file: ${error.message}`);
    }
  }
}
