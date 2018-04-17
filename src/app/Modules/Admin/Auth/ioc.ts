import Application from "../../../../vendor/Nterprise/Container/Application";
import AuthController from "./Controllers/AuthController";
import Auth from "./BusinessLogic/Auth";
import User from "../User/user";

export default (app: Application) => {

    let container = app.getContainer();

    // Controllers.
    container.bind("CONTROLLER_AUTH").to(AuthController);

    // Models.
    container.bind("BL_AUTH").toConstantValue(new Auth(User));

    app.setContainer(container);

    return app;
}