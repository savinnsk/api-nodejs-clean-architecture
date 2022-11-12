import { Router } from "express"
import { makeSignupController } from "../factories/signup/signup"
import { adapterRoute } from "../adapters/express-route.adapter"

export default (router: Router): void => {
  router.post('/signup', adapterRoute(makeSignupController()))
}
