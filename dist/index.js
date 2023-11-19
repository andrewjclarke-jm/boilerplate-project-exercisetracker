import express from "express";
import dotenv from "dotenv";
dotenv.config();
const expressApplicationInstance = express();
const applicationPortNumber = process.env.APPLICATION_PORT_NUMBER || 3000;
const applicationStartCallbackHandler = () => { };
expressApplicationInstance.get("/", (req, res) => res.send("connected"));
const startExpressApplicationServer = (portNumber, callback) => {
    expressApplicationInstance.listen(portNumber, callback);
};
startExpressApplicationServer(applicationPortNumber, applicationStartCallbackHandler);
