import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { LoginDto } from '../dto/login.dto';
import { SignUpDto } from '../dto/sign_up.dto';
import { AuthGuard } from '../guards/auth.guard';
import { GuestGuard } from '../guards/guest.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private readonly userService: UserService) {}

  @Post('login')
  @UseGuards(GuestGuard)
  async signIn(@Body() loginDto: LoginDto, @Res() response) {
    return response
      .status(200)
      .send(await this.authService.signIn(loginDto.email, loginDto.password));
  }

  @Post('sign-up')
  @UseGuards(GuestGuard)
  async signUp(@Body() body: SignUpDto, @Res() response) {
    const result = await this.userService.create(body);

    return response.status(201).send({
      success: true,
      message: 'New user sign up.',
      result,
    });

    return response.status(200).send({
      success: true,
    });
  }

  @Post('logout')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard)
  async signOut(@Res() response) {
    return response.status(200).send({
      success: true,
    });
  }
}
