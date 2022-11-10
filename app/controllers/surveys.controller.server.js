import surveyModel from '../views/content/models/movies.js';



import { UserDisplayName } from '../utils/index.js';

export function DisplaySurveyList(req, res, next){
    surveyModel.find(function(err, surveysCollection) {
        if(err){
            console.error(err);
            res.end(err);
        }

        res.render('index', {title: 'Survey List', page: 'surveys/list', movies: moviesCollection, displayName: UserDisplayName(req)});
    })
}

export function DisplaySurveysAddPage(req, res, next){
    res.render('index', { title: 'Add a survey', page: 'surveys/edit', movie: {}, displayName: UserDisplayName(req) });
}

export function ProcessSurveysAddPage(req, res, next){
    
    let newSurvey = surveyModel({
        name: req.body.name,
        year: req.body.year,
        director: req.body.director,
        genre: req.body.genre,
        runtime: req.body.runtime
    });

    surveyModel.create(newMovie, (err, Movie) => {
        if(err){
            console.error(err);
            res.end(err);
        };

        res.redirect('/survey-list')
    } )
}

export function DisplaySurveysEditPage(req, res, next){
    let id = req.params.id;

    surveyModel.findById(id, (err, movie) => {
        if(err){
            console.error(err);
            res.end(err);
        }

        res.render('index', { title: 'Edit Survey', page: 'surveys/edit', movie: movie, displayName: UserDisplayName(req) });
    });    
}

export function ProcessSurveysEditPage(req, res, next){

    let id = req.params.id;
    
    let newSurvey = surveyModel({
        _id: req.body.id,
        name: req.body.name,
        year: req.body.year,
        director: req.body.director,
        genre: req.body.genre,
        runtime: req.body.runtime
    });

    surveyModel.updateOne({_id: id }, newMovie, (err, Movie) => {
        if(err){
            console.error(err);
            res.end(err);
        };

        res.redirect('/survey-list')
    } )
}

export function ProcessSurveyDeletePage(req, res, next){
    let id = req.params.id;

    surveyModel.remove({_id: id}, (err) => {
        if (err){
            console.error(err);
            res.end(err);
        }

        res.redirect('/survey-list');
    })
}