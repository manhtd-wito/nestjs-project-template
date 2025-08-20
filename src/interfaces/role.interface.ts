import { Permission } from '../database/permission.schema';

export interface Role {
  name: string;
  description: string;
  slug: string;
  permissions: Permission[];
  createdAt: Date;
  updatedAt: Date;
}
