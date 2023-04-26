import express from 'express';
import { movieGenres } from './movieGenres';
import uniqid from 'uniqid';

const router = express.Router();
router.get('/', (req, res) => {
    res.json(movieGenres);
});

// Get movie genres by ID
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    var found = false;
    // find genres in list
    movieGenres.genres.forEach(item => {
        if (item.id == id) {
            res.status(200).json(item);
            console.log(item);
            found = true;
        }
    })

    if (found==false) {
        res.status(404).json({
            message: 'The resource you requested could not be found.',
            status_code: 404
        });        
    } 
    
});

export default router;
