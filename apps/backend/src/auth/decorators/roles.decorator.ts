import { SetMetadata } from '@nestjs/common';
import { Role } from '@shared-models/enums/auth/role.enum';

export const ROLES_KEY = 'roles';
export const Roles = <T extends Role>(...roles: T[]) =>
  SetMetadata(ROLES_KEY, roles);
