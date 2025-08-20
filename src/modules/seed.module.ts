import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user.module';
import { ConfigModule } from '@nestjs/config';
import { SeedService } from '../services/seed.service';
import { UserSchema } from '../database/user.schema';
import { RoleSchema } from '../database/role.schema';
import { PermissionSchema } from '../database/permission.schema';
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
          connection.on('disconnected', () =>
            console.log('MongoDB disconnected'),
          );
          connection.on('reconnected', () =>
            console.log('MongoDB reconnected'),
          );
          connection.on('disconnecting', () =>
            console.log('MongoDB disconnecting'),
          );

          return connection;
        },
      },
    ),
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
      {
        name: 'Role',
        schema: RoleSchema,
      },
      {
        name: 'Permission',
        schema: PermissionSchema,
      },
    ]),
  ],
  providers: [SeedService],
})
export class SeedModule {}
