import { Role } from '@shared-models/enums/auth/role.enum';

export class UserResponseDto {
  id!: number;
  name!: string;
  email!: string;
  role!: Role;
}
