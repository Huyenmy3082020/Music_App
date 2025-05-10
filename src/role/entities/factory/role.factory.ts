// role.factory.ts
import { Injectable } from '@nestjs/common';
import { RolePermission } from './interface/role-permision.interface';
import { AdminRole } from './interface/admin-role';
import { UserRole } from '../user_role.entity';
import { User } from 'src/user/entities/user.entity';
import { UserRoles } from './interface/user-role';

@Injectable()
export class RoleFactory {
  createAccessByRoleName(roleName: string): RolePermission {
    switch (roleName) {
      case 'admin':
        return new AdminRole();
      case 'user':
        return new UserRoles();
      default:
        throw new Error(`Role ${roleName} is not supported`);
    }
  }

  createAllPermissions(user: User): RolePermission[] {
    return user.roles.map((role) => this.createAccessByRoleName(role.name));
  }
}
