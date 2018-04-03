import Controller from "./Controller";
import IAuth from "../Interfaces/BusinessLogic/Auth";
import SuccessResponse from "../Services/Response/SuccessResponse";
import UnAuthorizedResponse from "../Services/Response/UnAuthorizedResponse";

class AuthController extends Controller {

    protected auth: IAuth;

    constructor(auth) {
        super();
        this.auth = auth;
    }

    public async login() {
        try {
            if (!await this.auth.attempt(this.request.get("username"), this.request.get("password"))) throw ".";
            let user = this.auth.user();
            this.request.session({authenticated: user});

            console.log(this.request.session());

            return SuccessResponse(this.response, user);
        } catch (e) {
            console.log(e);
            return UnAuthorizedResponse(this.response, {message: "UnAuthorized"});
        }
    }

}

export default AuthController;