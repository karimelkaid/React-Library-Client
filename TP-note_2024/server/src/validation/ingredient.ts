import { object, string, optional, size, refine } from 'superstruct';
import { isInt } from 'validator';

export const IngredientCreationData = object({
  nom: size(string(), 1, 50),
  unite: size(string(), 1, 50),
});

export const IngredientUpdateData = object({
  nom: optional(size(string(), 1, 50)),
  unite: optional(size(string(), 1, 50)),
});

export const IngredientGetAllQuery = object({
  skip: optional(refine(string(), 'int', (value) => isInt(value))),
  take: optional(refine(string(), 'int', (value) => isInt(value))),
});
