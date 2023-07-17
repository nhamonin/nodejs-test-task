import { promises as fs } from 'node:fs';
import { join } from 'node:path';

import { Injectable } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ImageService {
  private readonly basePath = join(__dirname, '..', '..', 'uploads');

  async saveImage(filename: string, data: Buffer): Promise<string> {
    const uniqueFilename = `${uuidv4()}_${filename}`;
    const path = join(this.basePath, uniqueFilename);

    await fs.mkdir(this.basePath, { recursive: true });
    await fs.writeFile(path, data);

    return path;
  }
}
