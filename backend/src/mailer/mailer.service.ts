import { Injectable, Logger } from '@nestjs/common';

import * as sgMail from '@sendgrid/mail';

import { User } from 'src/user/entities/user.entity';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class MailerService {
  private readonly logger = new Logger('MailerService');
  constructor(private tokenService: TokenService) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async sendVerificationEmail(user: User) {
    const token = await this.tokenService.generateJwt(
      { email: user.email, id: user.id },
      { expiresIn: '1d' },
    );
    const verificationLink = `${process.env.SERVER_URL}/api/email/verify/${token}`;

    const msg = {
      to: user.email,
      from: process.env.EMAIL_FROM,
      subject: 'Email Verification',
      text: `Please verify your email by clicking on the button below. This link will expire in 24 hours.`,
      html: `
      <div style="text-align: center;">
        <h1>Welcome to Node.js Test Task!</h1>
        <p>To complete your registration, please click the button below to verify your email address. Please note that this link will expire in 24 hours.</p>
        <a href="${verificationLink}" style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Verify Email</a>
        <p>If you did not request this, please ignore this email.</p>
      </div>
      `,
    };

    try {
      await sgMail.send(msg);
      this.logger.log('Email sent');
    } catch (error) {
      this.logger.error(error);
    }
  }
}
