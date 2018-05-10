import Controller from "../../../../../vendor/Nterprise/Http/Controller";
import Auth from "../BusinessLogic/Auth";
import {inject} from "inversify";

export default class AuthController extends Controller {

    auth: Auth;

    constructor(@inject("BL_AUTH") auth) {
        super();
        this.auth = auth;
    }

    public login() {
        return this.response.render("auth/_login_form");
    }

    public async attempt() {
        try {
            let [username, password] = [this.request.body["username"], this.request.body["password"]];

            if (!await this.auth.attempt(username, password)) throw "Invalid username or password.";

            this.request.session.regenerate((error) => {
                if (error) throw error;
                this.request.session["authenticated"] = this.auth.authenticatedUser;
                return this.response.redirect('/admin/dashboard');
            });
        } catch (error) {
            console.log(error);
            return this.response.redirect("/admin/auth");
        }
    }

    public logout() {
        try {
            this.request.session.destroy((error) => {
                if (error) throw error;
                return this.response.redirect("/admin/auth");
            })
        } catch (error) {
            console.log(error);
        }
    }
}