export interface RolePermission {
      canCreate(): boolean;
    canRead(): boolean;
    canUpdate(): boolean;
    canDelete(): boolean;
}