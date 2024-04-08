import type { Ingredient } from './types';

const apiBasename = 'http://localhost:3000';

export interface GetIngredientsParams {
	page?: number;
	pageSize?: number;
}

export async function get_ingredients({ page, pageSize }: GetIngredientsParams = {}) {
	const res = await fetch(`${apiBasename}/ingredients?${page && pageSize ? `&skip=${(page - 1) * pageSize}&take=${pageSize}` : ''}`);
	if (!res.ok) {
		const msg = await res.text();
		throw new Error(msg);
	}
	const ingredients: Ingredient[] = await res.json();
	const total = Number(res.headers.get('X-Total-Count')) || 0;
	return { ingredients, total };
};

// ====
// TODO: écrire les fonctions d'accès à l'API nécessaires à l'application
// ====

