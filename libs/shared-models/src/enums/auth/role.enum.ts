export enum Role {
  GUEST = 'guest',
  CLIENT = 'client',
  PROVIDER = 'provider',
  ADMIN = 'admin',
}

export const CreatableRoles = [Role.CLIENT, Role.PROVIDER, Role.ADMIN] as const;
