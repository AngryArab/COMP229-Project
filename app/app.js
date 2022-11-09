import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from 'express-session';




//modules for jwt
import cors from 'cors';
import passportJWT, { ExtractJwt } from 'passport-jwt';

//define strats
let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;




//fix for path
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

//auth step 1, import modules
import passport from 'passport';
import passportLocal from 'passport-local';
import flash from 'connect-flash';

//auth step 2, define auth strat;
let localStrategy = passportLocal.Strategy;

//auth step 3 imporet user model
import User from '../app/views/content/models/user.js';

//auth step 4, importing route
//importing mongoose
import mongoose from 'mongoose';

// Configuration Module
import { MongoURI, Secret } from '../config/config.js';

// importinmg routs
import indexRouter from './routes/index.route.server.js'
import movieRouter from './routes/movies.route.server.js';
import authRouter from './routes/auth.route.server.js';
import apiauthRouter from './routes/api/auth.api.route.server.js';
import moviesApiRouter from './routes/api/movies.api.router.server.js';
// instatiate express app
const app = express();

// mongo db configuration
mongoose.connect(MongoURI);
const db = mongoose.connection;

//if connection is successful or not
db.on('open', () => console.log("Connected to MongoDB"));
db.on('error', () => console.log("Mongo Connection Error"));



// view engine and ejs
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname,'/client')));
app.use(express.static(path.join(__dirname,'../public')));

app.use(cors()); //to be removed later

// auth step 4, use session
app.use(session({
    secret: Secret,
    saveUninitialized: false, 
    resave: false
}));

//austh step 5, setup flash
app.use(flash());

//auth step 6, start passport and session
app.use(passport.initialize());
app.use(passport.session());

//auth step 7, implment auth strat
passport.use(User.createStrategy());

//auth step 8, allows serializeation and deserialzier
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//setup jwt ooptions
let jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: Secret
}


let strategy = new JWTStrategy(jwtOptions, (jwt_payload, done) =>{
    User.findById(jwt_payload.id)
    .then(user =>{
        return done(null, user)
    })
    .catch(error =>{
        return done(err,false)
    });
});

passport.use(strategy);







// use routes
app.use('/', indexRouter);
app.use('/', movieRouter);
app.use('/', authRouter);
app.use('/api/auth', apiauthRouter);
app.use('/api/movies', moviesApiRouter);


export default app;
