import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Place } from './entities/place.entity';
import { PlacesService } from './places.service';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Post()
  async create(
    @Body('name') name: string,
    @Body('center') center: number[],
    @Body('borders') borders: any[]
  ) {
    const id = await this.placesService.create(name, center, borders);
    return { id }
  }

  @Get()
  async findAll() {
    const places = await this.placesService.findAll();
    return places;
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string
  ) {
    const place = await this.placesService.findOne(id);
    return place;
  }

  @Get('search/:query')
  async search(
    @Param('query') query: string
  ) {
    const places = await this.placesService.search(query);
    return places;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('center') center: number[],
    @Body('borders') borders: any[]
  ) {
    await this.placesService.update(id, name, center, borders);
    return null;
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string
  ) {
    await this.placesService.remove(id);
    return null;
  }
}
