export enum Role {
  Guest = 'guest',
  Client = 'client',
  Provider = 'provider',
  Admin = 'admin',
}

export const CreatableRoles = [Role.Client, Role.Provider, Role.Admin] as const;
