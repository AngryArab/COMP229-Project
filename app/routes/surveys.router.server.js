import { Router } from "express";
import { DisplaySurveyList } from "../controllers/surveys.controller.server.js";



const router = Router();

router.get('/survey-list', DisplaySurveyList);



export default router;