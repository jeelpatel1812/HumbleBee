import express from 'express';
const app = express();
import cors from 'cors';
import {limiter} from './middlewares/rate-limit.middleware.js'

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger-output.json' with { type: "json" };

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//middlewares
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credential: true 
    })
)
//common middleware
app.use(express.urlencoded({limit: "16kb", extended: true}));
app.use(express.json({limit: "16kb"}));
app.use(express.static("public"));
app.use(limiter);


// routes
import userRoute from './routes/user.route.js';
import hiveRoute from './routes/hive.route.js';
import cropRoute from './routes/crop.route.js';
app.use("/api/user", userRoute);
app.use("/api/hives", hiveRoute);
app.use("/api/crops", cropRoute);

export {app}