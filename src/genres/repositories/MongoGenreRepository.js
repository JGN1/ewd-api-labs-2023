import Genre from '../entities/Genre';
// import Genre from '../../entities/Genre';
import mongoose from 'mongoose';
import GenreRepository from './Repository';

export default class extends GenreRepository {

    constructor() {
        super();
        // const genreSchema = new mongoose.Schema(
        const genreSchema = new mongoose.Schema({        
            id:{type: Number, unique: true, index: true}, 
            name: String
        });
        this.model = mongoose.model('Genre', genreSchema);
    }

    async persist(genreEntity) {
        const { id, name } = genreEntity;
        const result = new this.model({ id, name });
        await result.save();
        genreEntity.id = result.id;
        return genreEntity;
    }

    async merge(genreEntity) {
        const { id, name } = genreEntity;
        await this.model.findByIdAndUpdate(id, { name });
        console.log({ id, name });
        return genreEntity;
    }

    async remove(genreId) {
        return this.model.findOneAndDelete(genreId);
    }

    async get(genreId) {
        const result = await this.model.findById(genreId);
        const { id, name } = result;
        return new Genre(id, name);
    }

    async find() {
        const genres = await this.model.find();
        return genres.map((result) => {
            return new Genre(result.id, result.name);
        });
    }
}
