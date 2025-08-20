import { Length, IsEmail, IsNotEmpty } from 'class-validator';
import { Match } from './validators/match.validator';

export class SignUpDto {
  @Length(1, 255)
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @Length(5, 320)
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @Length(8, 20)
  password: string;

  @IsNotEmpty()
  @Length(8, 20)
  @Match('password', { message: 'Confirm password must match password' })
  confirmPassword: string;
}
