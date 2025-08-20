import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { RoleService } from '../services/role.service';
import { Permission } from './permission.decorator';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let hasPermission = false;
    const permission = this.reflector.get(Permission, context.getHandler());

    if (!permission) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = await this.userService.findByEmail(request.user.email);

    if (!user || !user.roles || !user.permissions) {
      return false;
    }

    const roles = await this.roleService.findMany(user.roles.map(item => item.slug));

    roles.forEach((role) => {
      if (!role.permissions) {
        return false;
      }
      role.permissions.forEach((rolePermission) => {
        if (rolePermission.slug === permission) {
          hasPermission = true;
        }
      })
    })

    user.permissions.forEach((userPermission) => {
      if (userPermission.slug === permission) {
        hasPermission = true;
      }
    })

    return hasPermission;
  }
}
