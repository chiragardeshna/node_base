import Controller from "./Controller";

class UserController extends Controller {

    public collection() {
        return this.response.json({message: "HI FROM USER controller"});            
    }
}

export default UserController;