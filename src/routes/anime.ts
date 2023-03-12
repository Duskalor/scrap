import { Request, Response, Router } from 'express';
import { animeModel } from '../model/animeModel';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const response = await animeModel.find({});
  res.send(response);
});

export { router };
