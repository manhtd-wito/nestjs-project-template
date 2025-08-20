import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findByEmail(email);
    if (!user?.password || !compareSync(password, user?.password)) {
      throw new UnauthorizedException();
    }
    const access_token = await this.jwtService.signAsync({
      name: user.name,
      email: user.email,
    });

    return {
      access_token,
    };
  }
}
