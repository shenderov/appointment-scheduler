import { useEffect, useState } from 'react';
import { fetchServices } from '@api/services/services.public';
import { fetchProviders } from '@api/providers/providers.public';
import { ProviderPublicResponseDto } from '@shared-models/src/dtos/providers/provider-public-response.dto';
import { ServicePublicResponseDto } from '@shared-models/src/dtos/services/service-public-response.dto';

export const useSearchData = () => {
  const [services, setServices] = useState<ServicePublicResponseDto[]>([]);
  const [providers, setProviders] = useState<ProviderPublicResponseDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [servicesData, providersData] = await Promise.all([
          fetchServices(),
          fetchProviders(),
        ]);
        setServices(servicesData);
        setProviders(providersData);
      } catch (err) {
        console.error('Failed to load search data:', err);
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  return { services, providers, loading };
};
