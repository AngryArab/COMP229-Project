import passport from 'passport';
import userModel from "../../views/content/models/user.js";
import { GenerateToken } from "../../utils/index.js";

export function processLogin(req,res,next){
    passport.authenticate('/local', (err,user,info)=>{
        //checks for server error
        if(err){
            conesole.erroor(err);
            res.end(err);
        }
        if(!user){
            return res.json({success: false, msg: 'error, auth failure'});
        }
        req.logIn(user,(err) => {
            if(err){
                conesole.error(err)
                res.end(err);
        
          
            }
            const authToken = GenerateToken(user);
            return res.json({
                success: true,
                msg: 'user logged in succesfully',
                user:{
                    id: user._id,
                    displayName: user.displayName,
                    emailAddress: user.emailAddress
                },
            token: authToken
            })
        
        })

    })(req,res,next); //proceeds
}


export function processRegistration(req,res,next){
    let newUser = new userModel({
        ...req.body
    });


    userModel.register(newUser, req.body.password, (err) => {
        if(err){
            if(err == 'UserExistsError'){
                console.error('Error, this user already exitsts')
            }
        
            conesole.log(err);
            return res.json({success: false, msg: 'registrationt error'})
        }

        // if all registered
        return res.json({success: true, msg: 'user registered '});

    })

}

export function processLogout(req,res,next){
    req.logOut((err) =>{
    if(err){
        console.error(err);
        res.end(err);
    }
   
        console.log("user logged out");
    })

    res.json({success: true, msg: 'User logged out suesscly'});
    
}