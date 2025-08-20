import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../interfaces/user.interface';
import { Role } from '../interfaces/role.interface';
import { Permission } from '../interfaces/permission.interface';
import bcrypt from 'bcrypt';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Role') private readonly roleModel: Model<Role>,
    @InjectModel('Permission') private readonly permissionModel: Model<Permission>,
  ) {}

  async onModuleInit() {
    await this.seedRoles();
    await this.seedUsers();
    process.exit(); // Exit once seeding is done
  }

  async seedRoles() {
    const roles = await this.roleModel.find().exec();
    if (roles.length > 0) {
      console.log('Roles already exist, skipping seeding');
      return;
    }

    const permissionSeedData = [
      {
        name: 'create user',
        description: 'Create new user abilities',
        slug: 'create-user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'update user',
        description: 'Update existed user abilities',
        slug: 'update-user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'delete user',
        description: 'Delete existed user abilities',
        slug: 'delete-user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'view user',
        description: 'View existed user abilities',
        slug: 'view-user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await this.permissionModel.insertMany(permissionSeedData);
    const permissions = await this.permissionModel.find().exec();

    const roleSeedData = [
      {
        name: 'user',
        description: 'Default user role with basic abilities',
        slug: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'super admin',
        description: 'Server super admin handle all management',
        slug: 'super-admin',
        permissions: permissions,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await this.roleModel.insertMany(roleSeedData);
    console.log('Roles seeded');
  }

  async seedUsers() {
    const users = await this.userModel.find().exec();
    const roles = await this.roleModel.find().exec();
    if (users.length > 0) {
      console.log('Users already exist, skipping seeding');
      return;
    }

    const userSeedData = [
      {
        name: 'manhtd',
        email: 'manhtd@wito.vn',
        roles,
        password: bcrypt.hashSync('Aa@123456', 12),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await this.userModel.insertMany(userSeedData);
    console.log('Users seeded');
  }
}
