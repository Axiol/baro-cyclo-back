import * as mongoose from 'mongoose';
import { Review } from '../../reviews/entities/review.entity';

export const PlaceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  center: { type: [Number], required: true },
  borders: { type: [], required: true },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});

export interface Place extends mongoose.Document {
  _id?: string;
  name: string;
  center: number[];
  borders: any[];
  reviews: Review[];
  __v?: number;
}