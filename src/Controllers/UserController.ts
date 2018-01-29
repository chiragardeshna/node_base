import Controller from "./Controller";
import {IUserModel} from "../Interfaces/Models/IUserModel";
import {IUser} from "../Interfaces/Entities/IUser";
import * as Validator from "validatorjs";
import {UserValidator} from "../Validators/UserValidator";

class UserController extends Controller {

    protected userRepo: IUserModel;

    constructor(userRepo) {
        super();
        this.userRepo = userRepo;
    }

    public collection() {
        return this.response.json({message: "HI FROM USER controller"});
    }

    public async store() {
        let user = null;
        try {
            let data: IUser = {email: "test@g.com", firstName: "First Name", lastName: "Last Name"};

            let validation = new Validator(this.request.body, UserValidator.rules());
            if (validation.fails()) {
                return this.response.json({status: "Failure", errors: validation.errors});
            }

            Object.assign(this.userRepo, data);
            user = await this.userRepo.save();
            return this.response.json({status: "Success", data: user});
        } catch (e) {
            console.log(e);
            return this.response.json({status: "Failure", message: e.message});
        }
    }
}

export default UserController;