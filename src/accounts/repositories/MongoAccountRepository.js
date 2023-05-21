import Account from '../entities/Account';
// import Account from '../../entities/Account';
import mongoose from 'mongoose';
import AccountRepository from './Repository';
import logger from "../../logger";

export default class extends AccountRepository {

    constructor() {
        super();
        const accountsSchema = new mongoose.Schema({
            firstName: String,
            lastName: String,
            email: { type: String, unique: true, index: true },
            password: String,
            favourites: [Number]
        });
        this.model = mongoose.model('Account', accountsSchema);
    }

    async persist(accountEntity) {
        try {
            const { firstName, lastName, email, password } = accountEntity;
            const result = new this.model({ firstName, lastName, email, password });
            await result.save();
            accountEntity.id = result.id;
            return accountEntity;
        } catch (error) {
            logger.error(new Error(error));            
            accountEntity.status(500);
        }
    }

    async merge(accountEntity) {
        try {
            const { id, firstName, lastName, email, password, favourites } = accountEntity;
            await this.model.findByIdAndUpdate(id, { firstName, lastName, email, password, favourites });
            console.log({ id, firstName, lastName, email, password, favourites });
            return accountEntity;
        } catch (error) {
            logger.error(new Error(error));
        }
    }

    async remove(userId) {
        try {
            return this.model.findOneAndDelete(userId);
        } catch (error) {
            logger.error(new Error(error));
        }
    }

    async get(userId) {
        try {
            const result = await this.model.findById(userId);
            const { id, firstName, lastName, email, password, favourites } = result;
            return new Account(id, firstName, lastName, email, password, favourites);
        } catch (error) {
            logger.error(new Error(error));
        }
    }

    async getByEmail(userEmail) {
        try {
            const result = await this.model.findOne({ email: userEmail.toLowerCase() });
            return new Account(result.id, result.firstName, result.lastName, result.email, result.password, result.favourites);
        } catch (error) {
            logger.error(new Error(error));
        }
    }

    async find() {
        try {
            const accounts = await this.model.find();
            return accounts.map((result) => {
                return new Account(result.id, result.firstName, result.lastName, result.email, result.password, result.favourites);
            });
        } catch (error) {
            logger.error(new Error(error));
        }
    }
}
