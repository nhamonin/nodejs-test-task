import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(usernameOrEmail: string, password: string): Promise<any> {
    const user = await this.userService.findOneByUsernameOrEmail(
      usernameOrEmail,
    );
    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
