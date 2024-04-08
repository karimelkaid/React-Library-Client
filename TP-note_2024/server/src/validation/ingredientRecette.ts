import { object, optional, integer, min } from 'superstruct';

export const IngredientRecetteCreationData = object({
  quantite: min(integer(), 1),
});

export const IngredientRecetteUpdateData = object({
  quantite: optional(min(integer(), 1)),
});
