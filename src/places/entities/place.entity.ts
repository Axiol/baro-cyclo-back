import * as mongoose from 'mongoose';

export const PlaceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  center: { type: [Number], required: true },
  borders: { type: [], required: true }
});

export interface Place extends mongoose.Document {
  _id?: string;
  name: string;
  center: number[];
  borders: any[];
  __v?: number;
}