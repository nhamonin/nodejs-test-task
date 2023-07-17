import { PipeTransform, BadRequestException } from '@nestjs/common';
import {
  MAX_FILE_SIZE,
  VALID_FILE_TYPES,
} from '../image/image-upload.constants';

export class ImageUploadValidationPipe implements PipeTransform {
  transform(avatar: Express.Multer.File) {
    if (avatar && avatar.size > MAX_FILE_SIZE) {
      throw new BadRequestException('File too large');
    }
    if (avatar && !VALID_FILE_TYPES.includes(avatar.mimetype)) {
      throw new BadRequestException('Invalid file type');
    }

    return avatar;
  }
}
