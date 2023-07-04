import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Username must be a string' })
  @IsNotEmpty({ message: 'Username is required' })
  @MinLength(4, { message: 'Username is too short' })
  @MaxLength(20, { message: 'Username is too long' })
  readonly username: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email' })
  @MaxLength(30, { message: 'Email is too long' })
  readonly email: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password is too short' })
  @MaxLength(40, { message: 'Password is too long' })
  readonly password: string;
}
