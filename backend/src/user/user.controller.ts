import {
  Body,
  Controller,
  Post,
  Put,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { UserService } from './user.service';
import { ImageUploadValidationPipe } from '../pipes/image-upload-validation.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.userService.register(createUserDto);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('avatar'))
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile(new ImageUploadValidationPipe()) file: Express.Multer.File,
  ) {
    return await this.userService.update(id, updateUserDto, file);
  }
}
