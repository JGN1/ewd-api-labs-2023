import Account from '../entities/Account';
import logger from "../../logger";

export default {
  registerAccount: async (firstName, lastName, email, password, { accountsRepository, authenticator }) => {
    try {
      password = await authenticator.encrypt(password);
      const account = new Account(undefined, firstName, lastName, email, password);
      return accountsRepository.persist(account);
    } catch (error) {
      logger.error(new Error(error));
    }
  },
  getAccount: (accountId, { accountsRepository }) => {
    try {
      return accountsRepository.get(accountId);
    } catch (error) {
      logger.error(new Error(error));
    }
  },
  find: ({ accountsRepository }) => {
    try {
      return accountsRepository.find();
    } catch (error) {
      logger.error(new Error(error));
    }
  },
  findByEmail: (email, { accountsRepository }) => {
    try {
      return accountsRepository.getByEmail(email);
    } catch (error) {
      logger.error(new Error(error));
    }
  },
  updateAccount: async (id, firstName, lastName, email, password, { accountsRepository, authenticator }) => {
    try {
      password = await authenticator.encrypt(password);
      //TODO - you implement the rest
      const accountUpdate = new Account(id, firstName, lastName, email, password);
      return accountsRepository.merge(accountUpdate);
    } catch (error) {
      logger.error(new Error(error));
    }
  },
  authenticate: async (email, password, { accountsRepository, authenticator, tokenManager }) => {
    try {
      const account = await accountsRepository.getByEmail(email);
      const result = await authenticator.compare(password, account.password);
      if (!result) {
        throw new Error('Bad credentials');
      }
      const token = tokenManager.generate({ email: account.email });
      return token;
    } catch (error) {
      logger.error(new Error(error));
    }
  },
  verifyToken: async (token, { accountsRepository, tokenManager }) => {
      const decoded = await tokenManager.decode(token);
      const user = await accountsRepository.getByEmail(decoded.email);
      if (!user) {
        throw new Error('Bad token');
      }
      console.log("got past throw");
      return user.email;
  },
  getFavourites: async (accountId, { accountsRepository }) => {
    try {
      const account = await accountsRepository.get(accountId);
      return account.favourites;
    } catch (error) {
      logger.error(new Error(error));
    }
  },
  addFavourite: async (accountId, movieId, { accountsRepository }) => {
    try {
      const account = await accountsRepository.get(accountId);
      account.favourites.push(movieId);
      return await accountsRepository.merge(account);
    } catch (error) {
      logger.error(new Error(error));
    }
  }

};
