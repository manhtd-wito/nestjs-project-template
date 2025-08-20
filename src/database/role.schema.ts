import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Permission } from './permission.schema';
import * as mongoose from 'mongoose';

export type RoleDocument = HydratedDocument<Role>;


@Schema()
export class Role {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  slug: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }] })
  permissions: Permission[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
