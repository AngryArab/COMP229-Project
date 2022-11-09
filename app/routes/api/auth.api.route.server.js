import { Router } from 'express';
import { processLogin,
processLogout, 
processRegistration} from '../../controllers/api/auth-api-controller.js';

    const router = Router();
    
    router.post('/login',processLogin);
    router.post('/register', processRegistration);
    router.get('/logout', processLogout);
   
    export default router;