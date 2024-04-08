import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { HttpError } from './error';
import { StructError } from 'superstruct';

import * as ingredient from './requestHandlers/ingredient';
import * as recette from './requestHandlers/recette';
import * as ingredientRecette from './requestHandlers/ingredientRecette';

const app = express();
const port = 3000;

app.use(cors());
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Expose-Headers', 'X-Total-Count');
  next();
});

app.use(express.json());

app.get('/ingredients', ingredient.get_all);
app.get('/ingredients/:ingredient_id', ingredient.get_one);
app.post('/ingredients', ingredient.create_one);
app.patch('/ingredients/:ingredient_id', ingredient.update_one);
app.delete('/ingredients/:ingredient_id', ingredient.delete_one);

app.get('/recettes', recette.get_all);
app.get('/recettes/:recette_id', recette.get_one);
app.post('/recettes', recette.create_one);
app.patch('/recettes/:recette_id', recette.update_one);
app.delete('/recettes/:recette_id', recette.delete_one);

app.get('/recettes/:recette_id/ingredients', ingredientRecette.ingredients_of_recette);
app.get('/ingredients/:ingredient_id/recettes', ingredientRecette.recettes_of_ingredient);

app.post('/recettes/:recette_id/ingredients/:ingredient_id', ingredientRecette.add_ingredient_to_recette);
app.delete('/recettes/:recette_id/ingredients/:ingredient_id', ingredientRecette.remove_ingredient_from_recette);

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof StructError) {
    err.status = 400;
    err.message = `Bad value for field ${err.key}`;
  }
  return res.status(err.status ?? 500).send(err.message);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
