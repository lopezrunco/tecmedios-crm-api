import express, { Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose, { ConnectOptions } from "mongoose";

require("dotenv").config();

import { getDbConnectionString } from "./utils/get-db-connection-string";
import { routes } from "./routes";

const app: Express = express();

app.use(cors({
  origin: 'https://tecmedios.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(bodyParser.json());

const port = process.env.PORT || 3000;

const mongooseOptions: ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions;

mongoose
  .connect(getDbConnectionString(), mongooseOptions)
  .then(() => {
    app.listen(port);
    console.log(`Server is listening on http://localhost:${port}`);
    console.log("Connected to database.");
  })
  .catch((error) => {
    console.error("Could not connect to the database => ", error);
  });

routes(app);
