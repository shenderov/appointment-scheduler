export class ProviderPublicResponseDto {
  id!: number;
  profileImageUrl?: string;
  specialty!: string;
  title!: string;
  bio!: string;
  license!: {
    licenseName: string;
    licenseNumber: string;
  };
  serviceIds!: number[];
  user!: {
    id: number;
    name: string;
  };
}
