import { Logger, Module } from '@nestjs/common';
import { MailerService } from './mailer.service';

@Module({
  providers: [Logger, MailerService],
  exports: [MailerService],
})
export class MailerModule {}
