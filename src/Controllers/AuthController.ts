import Controller from "./Controller";
import IAuth from "../Interfaces/BusinessLogic/Auth";
import Auth from "../BusinessLogic/Auth";
import {IUserModel} from "../Interfaces/Models/IUserModel";
import {IUser} from "../Interfaces/Entities/IUser";
import * as Validator from "validatorjs";
import {UserValidator} from "../Validators/UserValidator";

class AuthController extends Controller {

    protected auth: IAuth;

    constructor(auth) {
        super();
        this.auth = auth;
    }

    public async login(){}
    
}

export default AuthController;