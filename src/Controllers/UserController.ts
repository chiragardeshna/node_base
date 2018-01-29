import Controller from "./Controller";
import {IUserModel} from "../Interfaces/IUserModel";
import {IUser} from "../Interfaces/Entities/IUser";

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