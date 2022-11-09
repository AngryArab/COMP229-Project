import jwt from 'jsonwebtoken';
import { Secret } from '../../config/config.js';


export function UserDisplayName(req){
    if(req.user){
        return req.displayName;
    }
    return '';
}

export function AuthGaurd(res,req,next){

    if(!req.isAuthenthicated()){
        return res.redirect('/login')
    }
    next();
}

export function GenerateToken(user){
    const payload ={
        id: user._id,
        displayName: user.displayName,
        emailAddress: user.emailAddress
    }

//expiration

    const jwtOptions = {
        expiresIn: 604800 //equivalant of 1 week
    }

    return jwt.sign(payload, Secret, jwtOptions);




}


