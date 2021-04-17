import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Place } from './entities/place.entity';

@Injectable()
export class PlacesService {
  constructor(
    @InjectModel('Place') private readonly placeModel: Model<Place>
  ) {}

  private async getPlace(id: string) {
    let place;
    try {
      place = await this.placeModel.findById(id).exec();
    } catch(err) {
      throw new NotFoundException('Place not found');
    }
    if(!place) {
      throw new NotFoundException('Place not found');
    }

    return place as Place;
  }

  async create(name: string, center: number[], borders: any[]) {
    let newPlace,
        res;
    try {
      newPlace = new this.placeModel({
        name,
        center,
        borders
      });
      res = await newPlace.save();
    } catch(err) {
      throw new ConflictException('A place with that name already exists');
    }

    return res.id as string;
  }

  async findAll() {
    const places = await this.placeModel.find().exec();

    return places;
  }

  async findOne(id: string) {
    const place = await this.getPlace(id);

    return place;
  }

  async update(id: string, name: string, center: number[], borders: any[]) {
    const place = await this.getPlace(id);
    if(name) {
      place.name = name;
    }
    if(center) {
      place.center = center;
    }
    if(borders) {
      place.borders = borders;
    }
    place.save();
  }

  async remove(id: string) {
    const res = await this.placeModel.deleteOne({_id: id}).exec();
    if(res.n === 0) {
      throw new NotFoundException('Place not found');
    }
  }

  async search(query: string) {
    const res = await this.placeModel.aggregate([
      {
        $search: {
          autocomplete: {
            path: 'name',
            query: query,
          },
        },
      },
      {
        $limit: 5,
      },
      {
        $project: {
          _id: 1,
          name: 1,
          center: 1,
          borders: 1
        },
      },
    ]);
    
    return res;
  }
}
