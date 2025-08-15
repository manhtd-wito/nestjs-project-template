import { Body, Controller, Post, Res, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async signIn(@Body() loginDto: LoginDto, @Res() response) {
    return response.status(200).send(await this.authService.signIn(loginDto.email, loginDto.password));
  }
}
