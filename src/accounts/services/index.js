import Account from '../entities/Account';

export default {
  registerAccount: async  (firstName, lastName, email, password, {accountsRepository}) => {
    const account = new Account(undefined, firstName, lastName, email, password);
    return accountsRepository.persist(account);
  },
  getAccount: (accountId, {accountsRepository}) => {
    return accountsRepository.get(accountId);
  },
  find: ({accountsRepository})=>{
    return accountsRepository.find();
  },
  findByEmail: (email, {accountsRepository})=>{
    return accountsRepository.getByEmail(email);
  },
  updateAccount: (id, firstName, lastName, email, password, {accountsRepository})=>{
    //TODO - you implement the rest
    const accountUpdate = new Account(id, firstName, lastName, email, password);
    return accountsRepository.merge(accountUpdate);
   } 
};
