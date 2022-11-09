import { Router } from "express";

import {  DisplayMoviesList, 
    DisplayMoviesAddPage, 
    ProcessMoviesAddPage, 
    ProcessMoviesEditPage, 
    DisplayMoviesEditPage, 
    ProcessMoviesDelete } from "../controllers/movies.controller.server.js";

    import { AuthGaurd } from "../utils/index.js";

const router = Router();

router.get('/movie-list', DisplayMoviesList);
router.get('/movie-add', AuthGaurd,DisplayMoviesAddPage);
router.post('/movie-add', AuthGaurd,ProcessMoviesAddPage);
router.post('/movie-edit/:id',AuthGaurd, ProcessMoviesEditPage);
router.get('/movie-edit/:id',AuthGaurd, DisplayMoviesEditPage);
router.get('/movie-delete/:id',AuthGaurd, ProcessMoviesDelete);

export default router;