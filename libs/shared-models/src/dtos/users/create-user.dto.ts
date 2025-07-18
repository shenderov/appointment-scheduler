import { IsEmail, IsNotEmpty, IsString, IsIn } from 'class-validator';
import { Role, CreatableRoles } from '@shared/models/enums';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;

  @IsIn(CreatableRoles)
  role!: Role;
}
