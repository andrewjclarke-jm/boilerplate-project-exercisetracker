var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
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
expressApplicationInstance.get("/", (req, res) => res.send("connected"));
expressApplicationInstance.use(cors);
expressApplicationInstance.use(bodyParser.json());
expressApplicationInstance.use(bodyParser.urlencoded({ extended: true }));
expressApplicationInstance.use("/api", userRouter);
const startExpressApplicationServer = (portNumber, callback) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield authenticateDatabaseConnection();
        expressApplicationInstance.listen(portNumber, callback);
    }
    catch (error) {
        console.error(`Something went wrong!, Please see error : ${error}`);
    }
});
startExpressApplicationServer(applicationPortNumber, applicationStartCallbackHandler);
