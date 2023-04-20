import { Router } from "express";
import { makeSignupController } from "../factories/controllers/signup/signup-controller-factory";
import { adapterRoute } from "../adapters/express/express-route.adapter";
import { makeLoginController } from "../factories/controllers/login/login-controller-factory";

export default (router: Router): void => {
  router.post("/signup", adapterRoute(makeSignupController()));
  router.post("/login", adapterRoute(makeLoginController()));
};
