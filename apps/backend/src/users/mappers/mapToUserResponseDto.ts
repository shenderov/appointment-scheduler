import { UserResponseDto } from '@shared-models/dtos/users/user-response.dto';
import { User } from '@users/entities/user.entity';

export function mapToUserResponseDto(user: User): UserResponseDto {
  return {
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    role: user.role,
  };
}
