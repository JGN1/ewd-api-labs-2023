import genreService from "../services";

export default (dependencies) => {
    const addGenre = async (request, response, next) => {
        // Input
        const { id, name } = request.body;
        // Treatment
        const genre = await genreService.addGenre(id, name, dependencies);
        //output
        response.status(201).json(genre);
    };
    const getGenreById = async (request, response, next) => {
        //input
        const genreId = request.params.id;
        // Treatment
        const genre = await genreService.getGenre(genreId, dependencies);
        //output
        response.status(200).json(genre);
    };
    const getGenres = async (request, response, next) => {
        // Treatment
        const genres = await genreService.find(dependencies);
        //output
        response.status(200).json(genres);
    };

    return {
        addGenre,
        getGenres,
        getGenreById
    };
};
