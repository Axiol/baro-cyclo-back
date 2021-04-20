import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel('Review') private readonly reviewModel: Model<Review>
  ) {}

  private async getReview(id: string) {
    let review;
    try {
      review = await this.reviewModel.findById(id).exec();
    } catch(err) {
      throw new NotFoundException('Review not found');
    }
    if(!review) {
      throw new NotFoundException('Review not found');
    }

    return review as Review;
  }

  async create(review: Review) {
    // console.log(review);
    let newReview,
        res;
    try {
      newReview = new this.reviewModel({
        ...review
      });
      res = await newReview.save();
    } catch(err) {
      throw new ConflictException('A review with that name already exists');
    }

    return res.id as string
  }

  async findAll() {
    const reviews = await this.reviewModel.find().exec();

    return reviews;
  }

  async findOne(id: string) {
    const review = await this.getReview(id);

    return review;
  }

  async update(id: string, newReview: Review) {
    let review = await this.getReview(id);
  }

  async remove(id: string) {
    const res = await this.reviewModel.deleteOne({_id: id}).exec();
    if(res.n === 0) {
      throw new NotFoundException('Review not found');
    }
  }
}
