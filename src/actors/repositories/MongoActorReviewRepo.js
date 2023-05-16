import Review from '../entities/ActorReview';
import mongoose from 'mongoose';
import ReviewRepository from './Repository';
import logger from "../../logger";

export default class extends ReviewRepository {

    constructor() {
        super();
        const actorReviewSchema = new mongoose.Schema({
            // id: {type: String, unique: true,  index: true},
            actorId: Number,
            firstName: String,
            lastName: String,
            review: String,
            rating: Number,
            author: String
        });
        this.model = mongoose.model('actorReview', actorReviewSchema);
    }

    async persist(reviewEntity) {
        try {
            const { actorId, firstName, lastName, review, rating, author } = reviewEntity;
            const result = new this.model({ actorId, firstName, lastName, review, rating, author });
            await result.save();
            reviewEntity.id = result.id;
            return reviewEntity;
        } catch (error) {
            logger.error(new Error(error));
        }
    }

    async merge(reviewEntity) {
        try {
            const { id, actorId, firstName, lastName, review, rating, author } = reviewEntity;
            await this.model.findByIdAndUpdate(id, { actorId, firstName, lastName, review, rating, author });
            console.log({ id, actorId, firstName, lastName, review, rating, author });
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
            const { id, actorId, firstName, lastName, review, rating, author } = result;
            return new Review(id, actorId, firstName, lastName, review, rating, author);
        } catch (error) {
            logger.error(new Error(error));
        }
    }

    async find() {
        try {
            const reviews = await this.model.find({});
            return reviews.map((result) => {
                return new Review(result.id, result.actorId, result.firstName, result.lastName, result.review, result.rating, result.author);
            });
        } catch (error) {
            logger.error(new Error(error));
        }
    }

    async getAll() {
        try {
            const reviews = await this.model.find({});
            return reviews.map((result) => {
                return new Review(result.id, result.actorId, result.firstName, result.lastName, result.review, result.rating, result.author);
            });
        } catch (error) {
            logger.error(new Error(error));
        }
    }

}
