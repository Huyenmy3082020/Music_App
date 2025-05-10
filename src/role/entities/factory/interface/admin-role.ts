import { RolePermission } from "./role-permision.interface";

export class AdminRole implements RolePermission{
    canCreate(): boolean {
        return true
    }
    canRead(): boolean {
        return true
        
    }
    canDelete(): boolean {
        return true
        

    }
    canUpdate(): boolean {
        return true
        
    }
}