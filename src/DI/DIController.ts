import UserController from "../Controllers/UserController";
import AuthController from "../Controllers/AuthController";
import User from "../Models/User";

export default (app) => {
    app.container.register("UserController", () => {
        let request = app.container.make('request');
        let response = app.container.make('response');
        return new UserController(User).boot(request, response);
    });
    app.container.register("AuthController", () => {
        let request = app.container.make('request');
        let response = app.container.make('response');
        let Auth = app.get('Auth');
        return new AuthController(Auth).boot(request, response);
    });
    return app;
}