import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { MailerModule } from 'src/mailer/mailer.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), MailerModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
