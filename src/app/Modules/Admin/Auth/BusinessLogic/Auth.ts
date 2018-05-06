import {compare} from "bcrypt";
import {injectable} from "inversify";

@injectable()
class Auth {

    protected user;

    public authenticatedUser: null;

    constructor(user) {
        this.user = user;
    }

    public async attempt(username: string, password: string): Promise<boolean> {
        let user = await this.user.findOne({email: username});
        if (!user || !await compare(password, user.password)) return false;
        delete user._doc.password;
        this.authenticatedUser = user;
        return true;
    }
}

export default Auth;