import { Injectable, BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { join, extname } from 'path';
import { promises as fs } from 'fs';

@Injectable()
export class FileService {
  private readonly uploadsFolder = join(process.cwd(), 'uploads');

  constructor() {
    fs.mkdir(this.uploadsFolder, { recursive: true }).catch(() => null);
  }

  async saveFile(file: Express.Multer.File, category: string): Promise<string> {
    try {
      const folderPath = join(this.uploadsFolder, category);
      await fs.mkdir(folderPath, { recursive: true });

      const fileName = `${uuidv4()}${extname(file.originalname).toLowerCase()}`;
      const filePath = join(folderPath, fileName);

      await fs.writeFile(filePath, file.buffer);

      return `/static/${category}/${fileName}`;
    } catch (error) {
      throw new BadRequestException(`Error saving file: ${error.message}`);
    }
  }

  async deleteFile(fileName: string, category: string): Promise<void> {
    try {
      const filePath = join(this.uploadsFolder, category, fileName);

      if (!(await this.fileExists(filePath))) {
        throw new BadRequestException('File not found');
      }

      await fs.unlink(filePath);
    } catch (error) {
      throw new BadRequestException(`Errod deleting file: ${error.message}`);
    }
  }

  private async fileExists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }
}
