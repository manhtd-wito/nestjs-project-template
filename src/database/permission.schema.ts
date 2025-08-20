import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PermissionDocument = HydratedDocument<Permission>;


@Schema()
export class Permission {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  slug: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
