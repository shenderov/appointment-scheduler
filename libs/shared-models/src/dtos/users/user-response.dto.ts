import { Role } from '@shared/models/enums';

export class UserResponseDto {
  id!: number;
  name!: string;
  email!: string;
  role!: Role;
}
