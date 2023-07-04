import { Injectable, Logger } from '@nestjs/common';

import * as sgMail from '@sendgrid/mail';

import { User } from 'src/user/entities/user.entity';

@Injectable()
export class MailerService {
  private readonly logger = new Logger('MailerService');
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async sendVerificationEmail(user: User) {
    const msg = {
      to: user.email,
      from: process.env.EMAIL_FROM,
      subject: 'Email Verification',
      text: 'Click on the link to verify your email',
      html: '<strong>Click on the link to verify your email</strong>',
    };

    try {
      await sgMail.send(msg);
      this.logger.log('Email sent');
    } catch (error) {
      this.logger.error(error);
    }
  }
}
