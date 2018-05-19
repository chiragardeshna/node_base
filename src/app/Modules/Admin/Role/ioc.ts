import Application from "../../../../vendor/Nterprise/Container/Application";
import RoleController from "./Controllers/RoleController";
import Role from "./Models/role";

export default (app: Application) => {

    let container = app.getContainer();

    // Controllers.
    container.bind("CONTROLLER_ROLE").to(RoleController);

    // Models.
    container.bind("MODEL_ROLE").toConstantValue(Role);

    app.setContainer(container);

    return app;
}