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
        const { movieId, movie, author, review, rating } = reviewEntity;
        const result = new this.model({ movieId, movie, author, review, rating });
        await result.save();
        reviewEntity.id = result.id;
        return reviewEntity;
    }

    async merge(reviewEntity) {
        const { id, movieId, movie, author, review, rating } = reviewEntity;
        await this.model.findByIdAndUpdate(id, { movieId, movie, author, review, rating });
        console.log({ id, movieId, movie, author, review, rating });
        return reviewEntity;
    }

    async remove(id) {
        return this.model.findOneAndDelete(id);
    }

    async get(reviewId) {
        const result = await this.model.findById(reviewId);
        console.log(JSON.stringify("this is the result of search " + result));
        const { id, movieId, movie, author, review, rating } = result;
        return new Review(id, movieId, movie, author, review, rating);
    }

    async getMovie(searchMovieId) {
        console.log("In MongoRepository getMovie method");
        try {
            const reviews = await this.model.find({ movieId: searchMovieId });


            return reviews.map((result) => {
                // return new Review(result.id, result.movieId, result.movie, result.author, result.review, result.rating);
                const { id, movieId, movie, author, review, rating } = result;
                return new Review(id, movieId, movie, author, review, rating);
            });
        } catch (error) {
            console.log(error);

        }
        //  reviews = await this.model.find({movieId: searchMovieId}, function (err, docs) {
        //             if (err){
        //                 console.log(err);
        //             }
        //             else{
        //                 console.log("First function call : ", docs);
        //             }
        //         });


        // const reviews = await this.model.find();
        // const reviews = await this.model.find({'movieId': searchMovieId});
        // console.log("this is the result of search " + JSON.stringify(reviews));
        // const {id, movieId, movie, author, review, rating } = result;
        // return new Review(id, movieId, movie, author, review, rating );
        // return new Review(result);
        // return reviews.map((result) => {
        //     // return new Review(result.id, result.movieId, result.movie, result.author, result.review, result.rating);
        //     const { id, movieId, movie, author, review, rating } = result;
        //     return new Review(id, movieId, movie, author, review, rating);
        // });


        // const result = await this.model.findById(searchMovieId);
        // console.log(JSON.stringify("this is the result of search " + result));
        // const {id, movieId, movie, author, review, rating } = result;
        // return new Review(id, movieId, movie, author, review, rating );
    }




    async find() {
        const reviews = await this.model.find();
        return reviews.map((result) => {
            return new Review(result.id, result.movieId, result.movie, result.author, result.review, result.rating);
        });
    }
}
