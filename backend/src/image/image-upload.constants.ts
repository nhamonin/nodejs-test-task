import { join } from 'node:path';

export const MAX_FILE_SIZE = 5000000; // 5MB
export const VALID_FILE_TYPES = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/gif',
  'image/webp',
  'image/svg+xml',
  'image/tiff',
  'image/bmp',
];
export const IMAGE_UPLOAD_PATH = join(__dirname, '..', '..', 'uploads');
