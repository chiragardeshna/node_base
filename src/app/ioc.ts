import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";

import AuthController from "./Controllers/Admin/AuthController";
import UserController from "./Controllers/UserController";
import Auth from "./BusinessLogic/Auth";
import User from "./Models/User";

const container = new Container();

// Controllers
container.bind(TYPES.CONTROLLER_AUTH).to(AuthController);
container.bind(TYPES.CONTROLLER_USER).to(UserController);

// Business Logic
container.bind(TYPES.BUSINESS_LOGIC_AUTH).to(Auth);

// Model
container.bind(TYPES.MODELS_USER).toConstantValue(User);


export { container };