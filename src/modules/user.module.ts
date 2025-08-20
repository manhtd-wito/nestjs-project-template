import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { RoleService } from '../services/role.service';
import { UserSchema } from '../database/user.schema';
import { RoleSchema } from '../database/role.schema';
import { PermissionSchema } from '../database/permission.schema';

@Module({
  imports: [
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
  controllers: [UserController],
  providers: [UserService, RoleService],
  exports: [UserService],
})
export class UserModule {}
