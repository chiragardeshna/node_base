import {inject} from "inversify";
import {TYPES} from "../types";
import Controller from "./Controller";
import {IUserModel} from "../Interfaces/Models/IUserModel";
import {IUser} from "../Interfaces/Entities/IUser";
import Hash from "../Services/Hash/Hash";

class UserController extends Controller {

    protected userRepo: IUserModel;

    constructor(
        @inject(TYPES.MODELS_USER) userRepo
    ) {
        super();
        this.userRepo = userRepo;
    }

    public index() {
        return this.response.render('index', {title: "Pug TEST", message: "This sis pug"});
    }

    public collection() {
        console.log(this.request.session("authenticated"));
        return this.response.json({message: "HI FROM USER controller"});
    }

    public async store() {
        let user = null;
        try {

            let data: IUser = this.request.get();
            let password = await Hash.make(data["password"], 3);
            Object.assign(this.userRepo, data, {password: password});
            user = await this.userRepo.save();

            return this.response.json({status: "Success", data: user});
        } catch (e) {
            console.log(e);
            return this.response.json({status: "Failure", message: e.message});
        }
    }
}

export default UserController;