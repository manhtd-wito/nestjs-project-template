import { Length, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
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
}
