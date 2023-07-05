import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtSignOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  async generateJwt(payload: object, options?: JwtSignOptions) {
    return this.jwtService.signAsync(payload, options);
  }
}
