import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { db } from './config/mongoose';
import { router } from './routes';
import { Anime } from './sources/hen';
const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
db().then(() => {
  console.log('conexión correcta con MongoDB');
});
Anime(30).then(() => {
  console.log('información obtenida!');
});

app.listen(PORT, () => {
  console.log(`escuchando desde el puerto ${PORT}`);
});
