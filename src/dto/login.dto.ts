import { Length, IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @Length(5, 320)
  email: string;

  @IsNotEmpty()
  @Length(8, 20)
  password: string;
}
