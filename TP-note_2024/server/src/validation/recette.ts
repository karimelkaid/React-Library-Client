import { object, string, optional, size, refine } from 'superstruct';
import { isInt } from 'validator';

export const RecetteCreationData = object({
  titre: size(string(), 1, 50),
  instructions: optional(string())
});

export const RecetteUpdateData = object({
  titre: optional(size(string(), 1, 50)),
  instructions: optional(string())
});

export const RecetteGetAllQuery = object({
  skip: optional(refine(string(), 'int', (value) => isInt(value))),
  take: optional(refine(string(), 'int', (value) => isInt(value))),
});
