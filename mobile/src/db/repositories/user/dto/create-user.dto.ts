export type CreateUserDto = {
  id?: string;
  name: string;
  email: string;
  dhPublicKey?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
};
