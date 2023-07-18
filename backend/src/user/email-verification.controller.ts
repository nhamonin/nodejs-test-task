import { Controller, Get, Param, NotFoundException, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';

@Controller('email')
export class EmailVerificationController {
  constructor(private readonly userService: UserService) {}

  @Get('verify/:token')
  async verifyEmail(@Param('token') token: string, @Res() res: Response) {
    try {
      const user = await this.userService.verifyEmailToken(token);

      if (!user) {
        throw new NotFoundException(
          'Invalid or expired email verification token',
        );
      }

      res.redirect('/email-verification-success');
    } catch (err) {
      res.redirect('/email-verification-error');
    }
  }
}
