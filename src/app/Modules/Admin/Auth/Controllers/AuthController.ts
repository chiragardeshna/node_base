import Controller from "../../../../../vendor/Nterprise/Http/Controller";
import Auth from "../BusinessLogic/Auth";
import {inject} from "inversify";

export default class AuthController extends Controller {

    auth: Auth;

    constructor(@inject("BL_AUTH") auth) {
        super();
        this.auth = auth;
    }

    login() {
        // this.response.render();
    }
}