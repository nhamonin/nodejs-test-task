import { promises as fs } from 'node:fs';
import { join } from 'node:path';

import { Injectable } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';

import { IMAGE_UPLOAD_PATH } from './image-upload.constants';

@Injectable()
export class ImageService {
  async saveImage(filename: string, data: Buffer): Promise<string> {
    const uniqueFilename = `${uuidv4()}_${filename}`;
    const path = join(IMAGE_UPLOAD_PATH, uniqueFilename);

    await fs.mkdir(IMAGE_UPLOAD_PATH, { recursive: true });
    await fs.writeFile(path, data);

    return uniqueFilename;
  }
}
