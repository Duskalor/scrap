import { Router } from 'express';
import { readdirSync } from 'fs';

const router = Router();
const PATH_DIR = `${__dirname}`;

const cleanName = (name: string) => {
  return name.split('.').shift();
};

readdirSync(PATH_DIR).filter((response) => {
  const name = cleanName(response);
  if (name !== 'index') {
    import(`./${name}`).then((module) => {
      router.use(`/${name}`, module.router);
    });
  }
});

export { router };
