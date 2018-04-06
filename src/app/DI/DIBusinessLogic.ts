import User from "../Models/User";
import Auth from "../BusinessLogic/Auth";

export default (app) => {
    app.container.register("Auth", () => {
        return new Auth(User);
    });
    return app;
}