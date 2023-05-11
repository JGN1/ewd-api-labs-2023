import Review from '../entities/ActorReview';
import mongoose from 'mongoose';
import ReviewRepository from './Repository';

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
        const {actorId, firstName, lastName, review, rating, author} = reviewEntity;
        const result = new this.model({actorId, firstName, lastName, review, rating, author});
        await result.save();
        reviewEntity.id=result.id;
        return reviewEntity;
    }

    async merge(reviewEntity) {
        const {id, actorId, firstName, lastName, review, rating, author } = reviewEntity;
        await this.model.findByIdAndUpdate(id, { actorId, firstName, lastName, review, rating, author });
        console.log({id, actorId, firstName, lastName, review, rating, author });
        return reviewEntity;
    }

    async remove(id) {
        return this.model.findOneAndDelete(id);
    }

    async get(reviewId) {
        const result = await this.model.findById(reviewId);
        console.log(JSON.stringify("this is the result of search " + result));
        const {id, actorId, firstName, lastName, review, rating, author } = result;
        return new Review(id, actorId, firstName, lastName, review, rating, author );
    }

    async find() {
        const reviews = await this.model.find({});        
        return reviews.map((result) => {
            return new Review(result.id, result.actorId, result.firstName, result.lastName, result.review, result.rating, result.author);
        });
    }
    
    async getAll() {
        const reviews = await this.model.find({});        
        return reviews.map((result) => {
            return new Review(result.id, result.actorId, result.firstName, result.lastName, result.review, result.rating, result.author);
        });
    }

}
