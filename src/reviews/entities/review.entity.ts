import * as mongoose from 'mongoose';
import { Place } from '../../places/entities/place.entity';

export const ReviewSchema = new mongoose.Schema({
  user: { type: String, required: true },
  city: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true },
  creation_date: { type: Date, required: true },
  general: {
    mooving: { type: Number, required: true },
    network: { type: Number, required: true },
    conflict_pedstrian: { type: Number, required: true },
    conflict_motor: { type: Number, required: true }
  },
  confort: {
    confort: { type: Number, required: true },
    maintained: { type: Number, required: true },
    signage: { type: Number, required: true },
    road_work: { type: Number, required: true }
  },
  security: {
    security: { type: Number, required: true },
    big_roads: { type: Number, required: true },
    small_roads: { type: Number, required: true },
    connections: { type: Number, required: true },
    thefts: { type: Number, required: true }
  },
  services: {
    parking: { type: Number, required: true },
    public_transport: { type: Number, required: true },
    renting: { type: Number, required: true },
    shops: { type: Number, required: true }
  },
  efforts: {
    efforts: { type: Number, required: true },
    communication: { type: Number, required: true },
    burgomaster: { type: Number, required: true },
    cars_tickets: { type: Number, required: true }
  }
});

export interface Review extends mongoose.Document {
  _id?: string;
  user: string;
  city: Place;
  creation_date: Date;
  general: {
    mooving: number;
    network: number;
    conflict_pedstrian: number;
    conflict_motor: number;
  };
  confort: {
    confort: number;
    maintained: number;
    signage: number;
    road_work: number;
  };
  security: {
    security: number;
    big_roads: number;
    small_roads: number;
    connections: number;
    thefts: number;
  };
  services: {
    parking: number;
    public_transport: number;
    renting: number;
    shops: number;
  };
  efforts: {
    efforts: number;
    communication: number;
    burgomaster: number;
    cars_tickets: number;
  };
  __v?: number;
}
