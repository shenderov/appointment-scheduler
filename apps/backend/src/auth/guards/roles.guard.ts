import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserResponseDto } from '@shared-models/dtos/users/user-response.dto';
import { Role } from '@shared-models/enums/auth/role.enum';
import { ROLES_KEY } from '@auth/decorators/roles.decorator';

interface AuthenticatedRequest {
  user?: UserResponseDto;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles || requiredRoles.length === 0) return true;

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const userRole = request.user?.role;

    if (!userRole) {
      throw new ForbiddenException('Missing user role in request.');
    }

    if (!requiredRoles.includes(userRole)) {
      throw new ForbiddenException(
        `Access denied: requires role(s) [${requiredRoles.join(', ')}], but current role is ${userRole}`,
      );
    }

    return true;
  }
}
