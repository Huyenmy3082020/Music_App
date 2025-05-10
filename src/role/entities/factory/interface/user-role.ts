import { RolePermission } from "./role-permision.interface";

export class UserRoles implements RolePermission {
  canCreate(): boolean {
    return false;
  }

  canRead(): boolean {
    return true;
  }

  canUpdate(): boolean {
    return false;
  }

  canDelete(): boolean {
    return false;
  }
}
