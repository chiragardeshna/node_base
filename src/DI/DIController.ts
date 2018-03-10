import UserController from "../Controllers/UserController";
import User from "../Models/User";

export default (app) => {
    app.container.register("UserController", () => {
        let request = app.container.make('request');
        let response = app.container.make('response');
        return new UserController(User).boot(request, response);
    });
    return app;
}