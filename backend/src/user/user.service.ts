import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { instanceToPlain } from 'class-transformer';
import { TokenExpiredError } from 'jsonwebtoken';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { MailerService } from 'src/mailer/mailer.service';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly mailerService: MailerService,
    private readonly tokenService: TokenService,
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
}