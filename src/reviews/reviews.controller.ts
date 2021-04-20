import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { Review } from './entities/review.entity';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  async create(
    @Body('review') review: Review
  ) {
    const id = await this.reviewsService.create(review);
    return { id }
  }

  @Get()
  async findAll() {
    const reviews = await this.reviewsService.findAll();
    return reviews;
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string
  ) {
    const review = this.reviewsService.findOne(id);
    return review;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() review: Review
  ) {
    await this.reviewsService.update(id, review);
    return null;
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string
  ) {
    await this.reviewsService.remove(id);
    return null;
  }
}
