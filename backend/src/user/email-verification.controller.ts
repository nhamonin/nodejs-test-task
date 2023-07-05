import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('email')
export class EmailVerificationController {
  constructor(private readonly userService: UserService) {}

  @Get('verify/:token')
  async verifyEmail(@Param('token') token: string) {
    const user = await this.userService.verifyEmailToken(token);

    if (!user) {
      throw new NotFoundException(
        'Invalid or expired email verification token',
      );
    }

    return { message: 'Email verified successfully' };
  }
}
