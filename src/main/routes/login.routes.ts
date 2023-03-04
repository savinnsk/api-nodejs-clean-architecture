import { Router } from "express";
import { makeSignupController } from "../factories/signup/signup-factory";
import { adapterRoute } from "../adapters/express/express-route.adapter";
import { makeLoginController } from "../factories/login/login-factory";

export default (router: Router): void => {
  router.post("/signup", adapterRoute(makeSignupController()));
  router.post("/login", adapterRoute(makeLoginController()));
};
