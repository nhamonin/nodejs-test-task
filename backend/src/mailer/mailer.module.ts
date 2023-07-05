import { Logger, Module } from '@nestjs/common';

import { TokenModule } from 'src/token/token.module';
import { MailerService } from './mailer.service';

@Module({
  imports: [TokenModule],
  providers: [Logger, MailerService],
  exports: [MailerService],
})
export class MailerModule {}
