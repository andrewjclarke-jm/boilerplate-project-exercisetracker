import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";

import dotenv from "dotenv";
dotenv.config();

import { userRouter } from "./src/Routes/index.js";

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

const startExpressApplicationServer = (
  portNumber: number | string,
  callback: () => void
) => {
  expressApplicationInstance.listen(portNumber, callback);
};

startExpressApplicationServer(
  applicationPortNumber,
  applicationStartCallbackHandler
);
