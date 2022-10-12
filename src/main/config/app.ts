import express from 'express'
import setupMiddlewares from '../config/middlewares'

const app = express()
setupMiddlewares(app)
export default app
