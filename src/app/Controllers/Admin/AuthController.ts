import Controller from "../Controller";
import IAuth from "../../Interfaces/BusinessLogic/Auth";
import SuccessResponse from "../../Services/Response/SuccessResponse";
import {inject, injectable} from "inversify";
import {TYPES} from "../../types";

@injectable()
class AuthController extends Controller {

    protected auth: IAuth;

    constructor(
        @inject(TYPES.BUSINESS_LOGIC_AUTH) auth
    ) {
        super();
        this.auth = auth;
    }

    public async login() {
        console.log(this.request.headers);
        this.response.render('admin/sign_in');
    }

    public async attempt() {
        try {
            if (!await this.auth.attempt(this.request.get("username"), this.request.get("password"))) throw ".";
            let user = this.auth.user();
            this.request.session["authenticated"] = user;
            console.log(this.request.session);
            return SuccessResponse(this.response, user);
        } catch (e) {
            console.log(e);
            this.response.redirect('/admin/auth');
        }
    }

}

export default AuthController;