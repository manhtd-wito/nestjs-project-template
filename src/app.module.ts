import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserController } from './controllers/user.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user.module';
import { AuthModule } from './modules/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(
      process.env.DB_HOST ?? 'mongodb://root:secret@mongo:27017/',
      {
        onConnectionCreate: (connection: Connection) => {
          connection.on('connected', () => console.log('MongoDB connected'));
          connection.on('open', () => console.log('MongoDB open'));
          connection.on('disconnected', () => console.log('MongoDB disconnected'));
          connection.on('reconnected', () => console.log('MongoDB reconnected'));
          connection.on('disconnecting', () => console.log('MongoDB disconnecting'));

          return connection;
        },
      },
    ),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
