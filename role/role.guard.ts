
import { Injectable, Dependencies } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './role.decorator';

@Injectable()
@Dependencies(Reflector)
export class RolesGuard {
  reflector: any;
  constructor(reflector) {
    this.reflector = reflector;
  }

  canActivate(context) {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }
    function matchRoles(requiredRoles: string[], userRoles: string[]): boolean {
        return requiredRoles.some(role => userRoles.includes(role));
      }
      
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return matchRoles(roles, user.roles);
  }
}
