import { Length, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @Length(1, 255)
  name: string;

  @IsOptional()
  @Length(8, 20)
  password: string;
}
