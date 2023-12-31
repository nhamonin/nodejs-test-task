import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const token = request.headers.authorization?.split(' ')[1];
      if (!token) {
        throw new UnauthorizedException(
          'Authentication failed: No token provided',
        );
      }

      const decodedToken: any = jwt.verify(
        token,
        this.configService.get<string>('JWT_SECRET'),
      );
      if (+request.params.id !== decodedToken.id) {
        throw new ForbiddenException(
          'You do not have permission to perform this operation',
        );
      }
      return true;
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }
}
