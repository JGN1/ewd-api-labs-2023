import Review from '../entities/Review';
import mongoose from 'mongoose';
import ReviewRepository from './Repository';

export default class extends ReviewRepository {

    constructor() {
        super();
        const reviewSchema = new mongoose.Schema({
            // id: {type: String, unique: true,  index: true},
            movieId: Number,
            movie: String,
            author: String,
            review: String,
            rating: Number
        });
        this.model = mongoose.model('Review', reviewSchema);
    }

    async persist(reviewEntity) {
        const {movieId, movie, author, review, rating} = reviewEntity;
        const result = new this.model({movieId, movie, author, review, rating});
        await result.save();
        reviewEntity.id=result.id;
        return reviewEntity;
    }

    async merge(reviewEntity) {
        const {id, movieId, movie, author, review, rating } = reviewEntity;
        await this.model.findByIdAndUpdate(id, { movieId, movie, author, review, rating });
        console.log({id, movieId, movie, author, review, rating });
        return reviewEntity;
    }

    async remove(id) {
        return this.model.findOneAndDelete(id);
    }

    async get(reviewId) {
        const result = await this.model.findById(reviewId);
        console.log(JSON.stringify("this is the result of search " + result));
        const {id, movieId, movie, author, review, rating } = result;
        return new Review(id, movieId, movie, author, review, rating );
    }

    async find() {
        const reviews = await this.model.find();
        return reviews.map((result) => {
            return new Review(result.id, result.movieId, result.movie, result.author, result.review, result.rating);
        });
    }
}
