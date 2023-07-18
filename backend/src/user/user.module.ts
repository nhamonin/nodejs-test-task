import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { EmailVerificationController } from './email-verification.controller';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { MailerModule } from 'src/mailer/mailer.module';
import { TokenModule } from 'src/token/token.module';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ImageModule } from '../image/image.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MailerModule,
    TokenModule,
    ImageModule,
  ],
  controllers: [UserController, EmailVerificationController],
  providers: [UserService, JwtAuthGuard],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
