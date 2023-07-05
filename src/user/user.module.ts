import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { EmailVerificationController } from './email-verification.controller';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { MailerModule } from 'src/mailer/mailer.module';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), MailerModule, TokenModule],
  controllers: [UserController, EmailVerificationController],
  providers: [UserService],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
