import Application from "../../../../vendor/Nterprise/Container/Application";
import UserController from "./Controllers/UserController";
import User from "./user";

export default (app: Application) => {

    let container = app.getContainer();

    // Controllers.
    container.bind("CONTROLLER_USER").to(UserController);

    // Models.
    container.bind("MODEL_USER").toConstantValue(User);

    app.setContainer(container);

    return app;
}