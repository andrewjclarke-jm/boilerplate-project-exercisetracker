import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";

import dotenv from "dotenv";
dotenv.config();

import { authenticateDatabaseConnection } from "./src/db/index.js";
import { userRouter } from "./src/routes/index.js";

const expressApplicationInstance = express();
const applicationPortNumber = process.env.APPLICATION_PORT_NUMBER || 3000;

const applicationStartCallbackHandler = () => {
  console.log(`server's listening on port ${applicationPortNumber}`);
};

expressApplicationInstance.get("/", (req: Request, res: Response) =>
  res.send("connected")
);

expressApplicationInstance.use(cors);
expressApplicationInstance.use(bodyParser.json());
expressApplicationInstance.use(bodyParser.urlencoded({ extended: true }));
expressApplicationInstance.use("/api", userRouter);

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
