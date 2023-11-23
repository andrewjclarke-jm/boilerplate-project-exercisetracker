import { RequestHandler } from "express";
import { BadRequestError, NotFoundError } from "../utils/errors/index.js";
import { UserModel } from "../models/all.js";
import { generateUserObject } from "../utils/factories/index.js";

export const createUserController: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    // retrieve username from request body
    const username = request.body.username;
    // perform custom validation
    if (!username) throw new BadRequestError("Username is required!");

    // create user
    const user = await UserModel.create(generateUserObject(username));

    response.status(201).json({
      message: "user created successfully!",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsersController: RequestHandler = async (
  _request,
  response,
  next
) => {
  try {
    // retrieve all users from db
    const users = await UserModel.findAll();
    // throw 404 error is no users are in the database
    if (users.length === 0) throw new NotFoundError("No users found");

    // return successful response
    response.status(201).json({
      message: "users retrieved successfully!",
      users: Array.isArray(users) ? users : [users],
    });
  } catch (error) {
    next(error);
  }
};
