import Application from "../../../vendor/Nterprise/Container/Application";
import ContactController from "./Controllers/ContactController";
import Contact from "./Models/Contact";

export default (app: Application) => {

    let container = app.getContainer();

    // Controllers.
    container.bind("CONTROLLER_CONTACT").to(ContactController);

    // Models.
    container.bind("MODEL_CONTACT").toConstantValue(Contact);



    app.setContainer(container);

    return app;
}