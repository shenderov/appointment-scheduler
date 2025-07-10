export class ProviderPublicResponseDto {
  id!: string;
  profileImageUrl?: string;
  specialty!: string;
  title!: string;
  bio!: string;
  license!: {
    licenseName: string;
    licenseNumber: string;
  };
  serviceIds!: string[];
  user!: {
    id: string;
    name: string;
  };
}
