import {
  Controller,
  Post,
  UseGuards,
  Request,
  HttpStatus,
} from '@nestjs/common';

import { Request as ExpressRequest } from 'express';

import { TokenService } from 'src/token/token.service';
import { LocalAuthGuard } from './local-auth.guard';
import { User } from 'src/user/entities/user.entity';

interface RequestWithUser extends ExpressRequest {
  user: User;
}

@Controller('auth')
export class AuthController {
  constructor(private tokenService: TokenService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: RequestWithUser) {
    return {
      statusCode: HttpStatus.CREATED,
      message: 'User logged in successfully',
      user: req.user,
      access_token: await this.tokenService.generateJwt(
        { username: req.user.username, sub: req.user.id },
        { expiresIn: '60s' },
      ),
    };
  }
}
