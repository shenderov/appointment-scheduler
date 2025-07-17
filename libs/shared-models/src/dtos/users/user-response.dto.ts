import { Role } from '@shared/models/enums'

export class UserResponseDto {
  id!: string;
  name!: string;
  email!: string;
  role!: Role;
}
