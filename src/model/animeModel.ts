import { Schema, model, Types } from 'mongoose';
import { anime } from '../interface/anime.interface';

const animeSchema = new Schema<anime>(
  {
    nombre: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export const animeModel = model('anime', animeSchema);
