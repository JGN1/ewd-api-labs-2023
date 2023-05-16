import Review from '../entities/Review';
import mongoose from 'mongoose';
import ReviewRepository from './Repository';
import logger from "../../logger";

export default class extends ReviewRepository {

    constructor() {
        super();
        const reviewSchema = new mongoose.Schema({
            // id: {type: String, unique: true,  index: true},
            movieId: Number,
            movie: String,
            author: String,
            content: String,
            rating: Number
        });
        this.model = mongoose.model('Review', reviewSchema);
    }

    async persist(reviewEntity) {
        try {
            const { movieId, movie, author, content, rating } = reviewEntity;
            const result = new this.model({ movieId, movie, author, content, rating });
            await result.save();
            reviewEntity.id = result.id;
            return reviewEntity;
        } catch (error) {
            logger.error(new Error(error));
        }
    }

    async merge(reviewEntity) {
        try {
            const { id, movieId, movie, author, content, rating } = reviewEntity;
            await this.model.findByIdAndUpdate(id, { movieId, movie, author, content, rating });
            console.log({ id, movieId, movie, author, content, rating });
            return reviewEntity;
        } catch (error) {
            logger.error(new Error(error));
        }
    }

    async remove(id) {
        try {
            return this.model.findOneAndDelete(id);
        } catch (error) {
            logger.error(new Error(error));
        }
    }

    async get(reviewId) {
        try {
            const result = await this.model.findById(reviewId);
            console.log(JSON.stringify("this is the result of search " + result));
            const { id, movieId, movie, author, content, rating } = result;
            return new Review(id, movieId, movie, author, content, rating);
        } catch (error) {
            logger.error(new Error(error));
        }
    }

    async getMovie(searchMovieId) {
        // console.log("In MongoRepository getMovie method");
        try {
            const reviews = await this.model.find({ movieId: searchMovieId });
            return reviews.map((result) => {
                const { id, movieId, movie, author, content, rating } = result;
                return new Review(id, movieId, movie, author, content, rating);
            });
        } catch (error) {
            logger.error(new Error(error));
        }
    }

    async find() {
        try {
            const reviews = await this.model.find();
            return reviews.map((result) => {
                return new Review(result.id, result.movieId, result.movie, result.author, result.content, result.rating);
            });
        } catch (error) {
            logger.error(new Error(error));
        }
    }
}
