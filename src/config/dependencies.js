import AccountsRepositoryInMemory from '../accounts/repositories/InMemoryRepository';
import AccountsRepositoryMongo from '../accounts/repositories/MongoAccountRepository';
import ReviewsRepositoryMongo from '../reviews/repositories/MongoReviewRepository';
import ActorRepositoryMongo from '../actors/repositories/MongoActorReviewRepo';
import GenreRepositoryMongo from '../genres/repositories/MongoGenreRepository';
import AccountSchema from '../accounts/validators';
import ReviewSchema from '../reviews/validators';
import ActorReviewSchema from '../actors/validators';
import GenreSchema from '../genres/validators';
import Authenticator from '../accounts/security/BCryptAuthenticator';
import TokenManager from './../accounts/security/JWTToken';

const buildDependencies = () => {
  const dependencies = {
    validators: GenreSchema, AccountSchema,
    authenticator: new Authenticator()
  };

  if (process.env.DATABASE_DIALECT === "in-memory") {
    dependencies.accountsRepository = new AccountsRepositoryInMemory();
    dependencies.accountSchema = AccountSchema;
  } else if (process.env.DATABASE_DIALECT === "mongo") {
    dependencies.accountsRepository = new AccountsRepositoryMongo();
    dependencies.reviewsRepository = new ReviewsRepositoryMongo();
    dependencies.actorReviewsRepository = new ActorRepositoryMongo();
    dependencies.genresRepository = new GenreRepositoryMongo();
    dependencies.accountSchema = AccountSchema;
    dependencies.reviewSchema = ReviewSchema;
    dependencies.actorReviewSchema = ActorReviewSchema;
    dependencies.genreSchema = GenreSchema;
    dependencies.tokenManager = new TokenManager();
  } else if (process.env.DATABASE_DIALECT === "mysql") {
    throw new Error('Add MySQL support');
  } else {
    throw new Error('Add DB Support to project');
  }
  return dependencies;
};

export default buildDependencies;




    // validators: AccountValidators,

// import AccountsRepositoryInMemory from '../accounts/repositories/in-memory/AccountRepository';
// import AccountsRepositoryMongo from '../accounts/repositories/mongo/AccountRepository';
// import Authenticator from './accounts/security';
// import Authenticator from '../accounts/security/simple';