import moviesService from "./../services";

export default (dependencies) => {

    const getMovie = async (request, response, next) => {
        //input
        const movieId = request.params.id;
        // Treatment
        const movie = await moviesService.getMovie(movieId, dependencies);
        //output
        response.status(200).json(movie);
    };
    const find = async (request, response, next) => {
        //input
        const query = request.query;
        // Treatment
        const movies = await moviesService.find(query, dependencies);
        //output
        response.status(200).json(movies);
    };
    const getUpcomingMovies = async (request, response, next) => {
        //TODO: You implement the rest
        //input
        // const query = request.query;
        // Treatment
        const movies = await moviesService.getUpcomingMovies(dependencies);
        //output
        response.status(200).json(movies);
    };


    return {
        getMovie,
        find,
        getUpcomingMovies
    };
};
