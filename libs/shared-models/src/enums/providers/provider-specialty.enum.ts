export enum ProviderSpecialty {
  MASSAGE = 'Massage',
  THERAPIST = 'Therapist',
  CHIROPRACTOR = 'Chiropractor',
  NURSE = 'Nurse',
  NUTRICIOLOGIST = 'Nutriciologist',
  PODIATOR = 'Podiator',
  OTHER = 'Other',
}

export const ProviderSpecialties = [ProviderSpecialty.MASSAGE, ProviderSpecialty.THERAPIST, ProviderSpecialty.CHIROPRACTOR, ProviderSpecialty.NURSE, ProviderSpecialty.NUTRICIOLOGIST, ProviderSpecialty.PODIATOR, ProviderSpecialty.OTHER] as const;
