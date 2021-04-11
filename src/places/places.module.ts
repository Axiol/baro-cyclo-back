import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlaceSchema } from './entities/place.entity';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Place', schema: PlaceSchema }])],
  controllers: [PlacesController],
  providers: [PlacesService]
})
export class PlacesModule {}
