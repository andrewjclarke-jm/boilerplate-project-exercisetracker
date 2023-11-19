import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const expressApplicationInstance = express();
const applicationPortNumber = process.env.APPLICATION_PORT_NUMBER || 3000;
const applicationStartCallbackHandler = () => {};

expressApplicationInstance.get("/", (req: Request, res: Response) =>
  res.send("connected")
);

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
