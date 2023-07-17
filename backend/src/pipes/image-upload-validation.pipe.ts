import { PipeTransform, BadRequestException } from '@nestjs/common';
import {
  MAX_FILE_SIZE,
  VALID_FILE_TYPES,
} from '../image/image-upload.constants';

export class ImageUploadValidationPipe implements PipeTransform {
  transform(file: Express.Multer.File) {
    if (file && file.size > MAX_FILE_SIZE) {
      throw new BadRequestException('File too large');
    }
    if (file && !VALID_FILE_TYPES.includes(file.mimetype)) {
      throw new BadRequestException('Invalid file type');
    }

    return file;
  }
}
