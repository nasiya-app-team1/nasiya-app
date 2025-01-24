import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { RoleAdmin } from '../enum/admin.enum';

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    if (!req.user?.role || req.user?.role !== RoleAdmin.SUPERADMIN) {
      throw new ForbiddenException('Forbidden user');
    } else {
      return true;
    }
  }
}
