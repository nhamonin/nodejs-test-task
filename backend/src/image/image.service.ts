import { join } from 'node:path';
import * as fs from 'node:fs/promises';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';

import {
  IMAGE_UPLOAD_PATH,
  MEDIUM_SIZE,
  SMALL_SIZE,
} from './image-upload.constants';

@Injectable()
export class ImageService {
  constructor(private readonly configService: ConfigService) {}
  private readonly baseUrl = join(
    this.configService.get<string>('SERVER_URL'),
    'uploads',
  );
  async saveImage(
    userId: number,
    filename: string,
    data: Buffer,
  ): Promise<string> {
    const uniqueFilename = `${uuidv4()}_${filename}`;
    const userFolderPath = join(IMAGE_UPLOAD_PATH, `${userId}`);
    const originalPath = join(userFolderPath, `original_${uniqueFilename}`);
    const mediumPath = join(userFolderPath, `medium_${uniqueFilename}`);
    const smallPath = join(userFolderPath, `small_${uniqueFilename}`);

    await this.cleanUserFolder(userFolderPath);

    await fs.mkdir(userFolderPath, { recursive: true });
    await fs.writeFile(originalPath, data);

    await sharp(originalPath).resize(MEDIUM_SIZE).toFile(mediumPath);
    await sharp(originalPath).resize(SMALL_SIZE).toFile(smallPath);

    return uniqueFilename;
  }

  async cleanUserFolder(folderPath: string): Promise<void> {
    if (!(await fs.stat(folderPath).catch(() => false))) return;

    const files = await fs.readdir(folderPath);
    for (const file of files) {
      const filePath = join(folderPath, file);
      await fs.unlink(filePath);
    }
  }

  async getAvatarUrls(userId: number, avatar: string): Promise<object> {
    return {
      original: join(this.baseUrl, `${userId}`, `original_${avatar}`),
      medium: join(this.baseUrl, `${userId}`, `medium_${avatar}`),
      small: join(this.baseUrl, `${userId}`, `small_${avatar}`),
    };
  }
}
