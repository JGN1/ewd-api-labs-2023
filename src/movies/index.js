import express from 'express';
import {movies, movieReviews, movieDetails, movieGenres} from './moviesData';
import uniqid from 'uniqid';

const router = express.Router(); 
router.get('/', (req, res) => {
    res.json(movies);
});

// Get movie details
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (movieDetails.id == id) {
        res.status(200).json(movieDetails);
    } else {
        res.status(404).json({
            message: 'The resource you requested could not be found.',
            status_code: 404
        });
    }
});

// Get movie reviews
router.get('/:id/reviews', (req, res) => {
    const id = parseInt(req.params.id);
    // find reviews in list
    if (movieReviews.id == id) {
        res.status(200).json(movieReviews);
    } else {
        res.status(404).json({
            message: 'The resource you requested could not be found.',
            status_code: 404
        });
    }
}); 

//Post a movie review
router.post('/:id/reviews', (req, res) => {
    const id = parseInt(req.params.id);

    if (movieReviews.id == id) {
        req.body.created_at = new Date();
        req.body.updated_at = new Date();
        req.body.id = uniqid();
        console.log(JSON.stringify(req.body));
        movieReviews.results.push(req.body); //push the new review onto the list
        res.status(201).json(req.body);
    } else {
        res.status(404).json({
            message: 'The resource you requested could not be found.',
            status_code: 404
        });
    }
});

// // Get movie genres
// router.get('/api/genres', (req, res) => {
//     res.status(200).json(movieGenres);
//     // if (movieReviews.id == id) {
//     //     res.status(200).json(movieReviews);
//     // } else {
//     //     res.status(404).json({
//     //         message: 'The resource you requested could not be found.',
//     //         status_code: 404
//     //     });
//     // }
// }); 

// // Get movie genres by ID
// router.get('/api/genres/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     // find reviews in list
//     if (movieGenres.id == id) {
//         res.status(200).json(movieGenres);
//     } else {
//         res.status(404).json({
//             message: 'The resource you requested could not be found.',
//             status_code: 404
//         });
//     }
// }); 

export default router;
