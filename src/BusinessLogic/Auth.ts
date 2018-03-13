import {IUserModel} from "../Interfaces/Models/IUserModel";
import {IUser} from "../Interfaces/Entities/IUser";

class Auth{

    protected userRepo: IUserModel;

    constructor(userRepo) {
        this.userRepo = userRepo;
    }

    public async attempt(){

    }
}

export default Auth;