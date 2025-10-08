import { Provider } from '@providers/entities/providers.entity';
import { ProviderPublicResponseDto } from '@providers/dtos/provider-public-response.dto';

export function mapToPublicProviderDto(
  provider: Provider,
): ProviderPublicResponseDto {
  return {
    id: provider.id,
    profileImageUrl: provider.profileImageUrl,
    specialty: provider.specialty,
    title: provider.title,
    bio: provider.bio || '',
    license: {
      licenseName: provider.licenseName,
      licenseNumber: provider.licenseNumber,
    },
    serviceIds: (provider.services || []).map((s) => s.id),
    user: {
      id: provider.user.id,
      name: provider.user.name,
    },
  };
}
