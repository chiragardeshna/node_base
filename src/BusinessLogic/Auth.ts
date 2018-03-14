import {IUserModel} from "../Interfaces/Models/IUserModel";
import IAuth from "../Interfaces/BusinessLogic/Auth";
import BCrypt from "../Services/Hash/Hash";
import {IUser} from "../Interfaces/Entities/IUser";

class Auth implements IAuth {

    protected userRepo: IUserModel;

    protected authenticatedUser: null;

    constructor(userRepo) {
        this.userRepo = userRepo;
    }

    public async attempt(username: string, password: string): Promise<boolean> {
        let user = await this.userRepo.findOne({email: username});
        if (!user || !await BCrypt.check(password, user.password)) return false;
        this.authenticatedUser = user;
        return true;
    }

    public user(): IUser {
        return this.authenticatedUser;
    }
}

export default Auth;