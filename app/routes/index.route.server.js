import { Router } from "express";
import { displayAboutPage, 
    displayContactPage, 
    displayHomePage, 
    } from "../controllers/index.controller.server.js";

const router = Router();

router.get('/', displayHomePage);
router.get('/home', displayHomePage);
router.get('/about', displayAboutPage);
router.get('/contact', displayContactPage);


export default router;
