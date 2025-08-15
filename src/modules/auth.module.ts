import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserModule } from './user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../controllers/auth.controller';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '600s' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
