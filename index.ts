import express, { Request, Response } from "express";
import cors from "cors";
import xss from "xss-clean";
import helmet from "helmet";
import bodyParser from "body-parser";

import dotenv from "dotenv";
dotenv.config();

import { authenticateDatabaseConnection } from "./src/db/index.js";
import {
  exerciseLogRouter,
  exerciseRouter,
  userRouter,
} from "./src/routes/index.js";

import {
  errorHandlerMiddleware,
  routeNotFoundMiddleware,
} from "./src/middlewares/index.js";

const expressApplicationInstance = express();
const applicationPortNumber = process.env.APPLICATION_PORT_NUMBER || 3000;

const applicationStartCallbackHandler = () => {
  console.log(`server's listening on port ${applicationPortNumber}`);
};

expressApplicationInstance.use(xss());
expressApplicationInstance.use(helmet());
expressApplicationInstance.use(cors());
expressApplicationInstance.use(bodyParser.urlencoded({ extended: false }));
expressApplicationInstance.use(bodyParser.json());

expressApplicationInstance.get("/", (req: Request, res: Response) =>
  res.send("connected")
);

expressApplicationInstance.use(
  "/api",
  userRouter,
  exerciseRouter,
  exerciseLogRouter
);

expressApplicationInstance.use(routeNotFoundMiddleware);
expressApplicationInstance.use(errorHandlerMiddleware);

const startExpressApplicationServer = async (
  portNumber: number | string,
  callback: () => void
) => {
  try {
    await authenticateDatabaseConnection();
    expressApplicationInstance.listen(portNumber, callback);
  } catch (error) {
    console.error(`Something went wrong!, Please see error : ${error}`);
  }
};

startExpressApplicationServer(
  applicationPortNumber,
  applicationStartCallbackHandler
);
