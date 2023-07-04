import {
  Controller,
  Post,
  UseGuards,
  Request,
  HttpStatus,
} from '@nestjs/common';

import { Request as ExpressRequest } from 'express';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { User } from 'src/user/entities/user.entity';

interface RequestWithUser extends ExpressRequest {
  user: User;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: RequestWithUser) {
    return {
      statusCode: HttpStatus.OK,
      message: 'User logged in successfully',
      user: req.user,
      access_token: await this.authService.generateJwt(req.user),
    };
  }
}
