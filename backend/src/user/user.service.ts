import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { instanceToPlain } from 'class-transformer';
import { TokenExpiredError } from 'jsonwebtoken';

import { User } from './entities/user.entity';
import { MailerService } from 'src/mailer/mailer.service';
import { TokenService } from 'src/token/token.service';
import { ImageService } from '../image/image.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly mailerService: MailerService,
    private readonly tokenService: TokenService,
    private readonly imageService: ImageService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password } = createUserDto;
    const existingUser = await this.usersRepository.findOne({
      where: [{ username }, { email }],
    });

    if (existingUser) {
      throw new ConflictException('Username or email already exists');
    }

    const user = new User();
    user.username = username;
    user.email = email;
    user.password = await bcrypt.hash(password, 10);

    const savedUser = await this.usersRepository.save(user);

    this.mailerService.sendVerificationEmail(savedUser);

    return instanceToPlain(savedUser) as User;
  }

  async findOneById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: +id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return instanceToPlain(user) as User;
  }

  async findOneByUsernameOrEmail(usernameOrEmail: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });
  }

  async verifyEmailToken(token: string): Promise<User> {
    try {
      const tokenPayload = await this.tokenService.verifyAsync(token);
      const user = await this.usersRepository.findOne({
        where: { id: tokenPayload.userId },
      });

      if (!user) {
        throw new ConflictException('User not found');
      }

      if (user.email !== tokenPayload.email) {
        throw new ConflictException('Token email does not match user email');
      }

      user.isVerified = true;
      await this.usersRepository.save(user);

      return user;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('The token is expired');
      } else {
        throw error;
      }
    }
  }

  async update(
    userId: string,
    updateUserDto: UpdateUserDto,
    file: Express.Multer.File,
  ): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: +userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { username, email, password } = updateUserDto;

    if (username && username !== user.username) {
      const existingUser = await this.usersRepository.findOne({
        where: { username },
      });
      if (existingUser && existingUser.id !== +userId) {
        throw new ConflictException('Username already exists');
      }
      user.username = username;
    }

    if (email && email !== user.email) {
      const existingUser = await this.usersRepository.findOne({
        where: { email },
      });
      if (existingUser && existingUser.id !== +userId) {
        throw new ConflictException('Email already exists');
      }
      user.email = email;
      user.isVerified = false;
      this.mailerService.sendVerificationEmail(user);
    }

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    if (file) {
      const uniqueFilename = await this.imageService.saveImage(
        +userId,
        file.originalname,
        file.buffer,
      );
      user.avatar = uniqueFilename;
    }

    const updatedUser = await this.usersRepository.save(user);

    return instanceToPlain(updatedUser) as User;
  }
}
