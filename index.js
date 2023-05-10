import dotenv from 'dotenv';
import express from 'express';
// import genresRouter from './src/genres';
import genresRouter from './src/genres/routes';
import createAccountsRouter from './src/accounts/routes';
import buildDependencies from "./src/config/dependencies";
import createMoviesRouter from './src/movies/routes';
import createReviewsRouter from './src/reviews/routes';
import createActorsRouter from './src/actors/routes';
import db from './src/config/db';
import errorHandler from './src/utils/ErrorHandler';

dotenv.config();
db.init();

const dependencies = buildDependencies();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/api/genres', genresRouter(dependencies));
app.use('/api/accounts', createAccountsRouter(dependencies));
app.use('/api/movies', createMoviesRouter(dependencies));
app.use('/api/reviews', createReviewsRouter(dependencies));
app.use('/api/actors', createActorsRouter(dependencies));
app.use(errorHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
