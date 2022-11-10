import { Router } from "express";

import { 
    DisplaySurveysAddPage,
    DisplaySurveyList,
    ProcessSurveysAddPage,
    ProcessSurveysEditPage,
    DisplaySurveysEditPage,
    ProcessSurveyDeletePage} from "../controllers/surveys.controller.server.js";

    import { AuthGaurd } from "../utils/index.js";

const router = Router();

router.get('/survey-list', DisplaySurveyList);
router.get('/survey-add', AuthGaurd,DisplaySurveysAddPage);
router.post('/survey-add', AuthGaurd,ProcessSurveysAddPage);
router.post('/survey-edit/:id',AuthGaurd, ProcessSurveysEditPage);
router.get('/survey-edit/:id',AuthGaurd, DisplaySurveysEditPage);
router.get('/movie-delete/:id',AuthGaurd, ProcessSurveyDeletePage);

export default router;