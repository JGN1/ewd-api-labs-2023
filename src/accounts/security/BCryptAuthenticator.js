import Authenticator from './Authenticator';
import bcrypt from 'bcryptjs';

export default class extends Authenticator {

    async encrypt(password) {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    async compare(password, encryptedPassword) {
        try {
            // Compare password
            const result = await bcrypt.compare(password, encryptedPassword);
            return result;
        } catch (error) {
            return false;
        }
    }
}
