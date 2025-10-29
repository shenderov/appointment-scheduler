import { UserResponseDto } from '@shared-models/dtos/users/user-response.dto';
import { User } from '@users/entities/user.entity';

export function mapToUserResponseDto(user: User): UserResponseDto {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}
