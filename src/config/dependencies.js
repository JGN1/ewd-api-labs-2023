import AccountsRepositoryInMemory from '../accounts/repositories/InMemoryRepository';
// import AccountsRepositoryInMemory from '../accounts/repositories/in-memory/AccountRepository';
// import AccountsRepositoryMongo from '../accounts/repositories/mongo/AccountRepository';
import AccountsRepositoryMongo from '../accounts/repositories/MongoAccountRepository';
import GenreRepositoryMongo from '../genres/repositories/MongoGenreRepository';
import AccountSchema from '../accounts/validators';
import GenreSchema from '../genres/validators';
// import Authenticator from './accounts/security';
import Authenticator from '../accounts/security/simple';

const buildDependencies = () => {
  const dependencies = {
    validators: GenreSchema, AccountSchema,
    // validators: AccountValidators,
    authenticator: new Authenticator()
  };

  if (process.env.DATABASE_DIALECT === "in-memory") {
    dependencies.accountsRepository = new AccountsRepositoryInMemory();
    dependencies.accountSchema = AccountSchema;
  } else if (process.env.DATABASE_DIALECT === "mongo") {
    dependencies.accountsRepository = new AccountsRepositoryMongo();
    dependencies.genresRepository = new GenreRepositoryMongo();
    dependencies.accountSchema = AccountSchema;
    dependencies.genreSchema = GenreSchema;
  } else if (process.env.DATABASE_DIALECT === "mysql") {
    throw new Error('Add MySQL support');
  } else {
    throw new Error('Add DB Support to project');
  }
  return dependencies;
};

export default buildDependencies;
