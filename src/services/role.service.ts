import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from '../interfaces/role.interface';
import { Permission } from '../interfaces/permission.interface';

@Injectable()
export class RoleService {
  constructor(@InjectModel('Role') private roleModel: Model<Role>) {}

  async findBySlug(slug: string): Promise<Role | null> {
    const role = this.roleModel.findOne({ slug })
      .populate<{ permission: Permission[] }>("permissions")
      .exec();
    return role;
  }

  async findMany(slugs: string[]): Promise<Role[]> {
    return this.roleModel.find()
      .where('slug')
      .in(slugs)
      .populate<{ permission: Permission[] }>("permissions")
      .exec();
  }

  async findAll(): Promise<Role[]> {
    return this.roleModel.find().exec();
  }
}
