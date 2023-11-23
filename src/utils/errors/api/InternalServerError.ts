import { HTTPStatusCodes } from "../../enums/index.js";

export default class InternalServerError {
  private _message: string;
  private _code: number;

  constructor(
    message: string,
    code: number = HTTPStatusCodes.INTERNAL_SERVER_ERROR
  ) {
    this._message = message;
    this._code = code;
  }

  public get message(): string {
    return this._message;
  }

  public get code(): number {
    return this._code;
  }
}
