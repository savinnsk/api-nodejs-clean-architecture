import { Router } from "express";
import { adapterRoute } from "../adapters/express/express-route.adapter";
import { makeAddSurveyController } from "../factories/controllers/survey/add-survey-controller-factory";
import { adapterMiddleware } from "../adapters/express/express-middleware-adapter";
import { makeAuthMiddleware } from "../factories/middlewares/auth-middleware-factory";

export default (router: Router): void => {
  const adminAuth = adapterMiddleware(makeAuthMiddleware('admin'))
  router.post("/surveys", adminAuth ,adapterRoute(makeAddSurveyController()));
};
