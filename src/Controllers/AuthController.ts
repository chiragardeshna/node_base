import Controller from "./Controller";
import IAuth from "../Interfaces/BusinessLogic/Auth";
import SuccessResponse from "../Services/Response/SuccessResponse";
import NotFoundResponse from "../Services/Response/NotFoundResponse";

class AuthController extends Controller {

    protected auth: IAuth;

    constructor(auth) {
        super();
        this.auth = auth;
    }

    public async login() {
        try {
            if (!await this.auth.attempt(this.request.get("username"), this.request.get("password"))) throw "Model Not Found.";
            let user = this.auth.user();
            return SuccessResponse(this.response, user);
        } catch (e) {
            console.log(e);
            return NotFoundResponse(this.response);
        }
    }

}

export default AuthController;