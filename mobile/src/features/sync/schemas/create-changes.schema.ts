import { Type, type } from 'arktype';

interface Changes<T> {
  created: T[];
  updated: T[];
  deleted: string[];
}

export const createChangesSchema = <T>(schema: Type<T>): Type<Changes<T>> => {
  return type({
    created: schema.array(),
    updated: schema.array(),
    deleted: 'string[]',
  });
};
