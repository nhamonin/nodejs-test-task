import { IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsString()
  usernameOrEmail: string;

  @IsString()
  @MinLength(4)
  password: string;
}
