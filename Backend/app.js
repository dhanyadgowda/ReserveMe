
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config({path: "./config/config.env"})
import {dbConnection} from './db/db.js'
import {errorMiddleware} from './error/error.js'
import reservationRoute from './routes/reservationRoutes.js'

const app = express()

app.use(cors({
  origin: [process.env.FONTEND_URL],
  methods: ["POST"],
  credentials:true
}))

app.use(express.json())
app.use(express.urlencoded({encoded: true}))
app.use('/api/v1/reservation', reservationRoute)
dbConnection()

app.use(errorMiddleware)

export default app