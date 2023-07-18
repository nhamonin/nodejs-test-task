import {
  Body,
  Controller,
  Post,
  Put,
  Param,
  UseInterceptors,
  UseGuards,
  UploadedFile,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { UserService } from './user.service';
import { ImageService } from '../image/image.service';
import { ImageUploadValidationPipe } from '../pipes/image-upload-validation.pipe';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly imageService: ImageService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.userService.register(createUserDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOneById(@Param('id') id: string) {
    const user = await this.userService.findOneById(id);
    const avatarUrls = await this.imageService.getAvatarUrls(
      user.id,
      user.avatar,
    );

    return { ...user, avatarUrls };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile(new ImageUploadValidationPipe()) file: Express.Multer.File,
  ) {
    const updatedUser = await this.userService.update(id, updateUserDto, file);
    const avatarUrls = await this.imageService.getAvatarUrls(
      updatedUser.id,
      updatedUser.avatar,
    );

    return { ...updatedUser, avatarUrls };
  }
}
