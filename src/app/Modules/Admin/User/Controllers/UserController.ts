import Controller from "../../../../../vendor/Nterprise/Http/Controller";
import {hash} from "bcrypt";
import {inject} from "inversify";

export default class UserController extends Controller {

    protected userRepo;
    protected roleRepo;

    constructor(@inject('MODEL_USER') userRepo, @inject('MODEL_ROLE') roleRepo) {
        super();
        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
    }

    public async index() {
        let users = await this.userRepo.find();
        return this.response.render('user/index', {users});
    }

    public async create() {
        let roles = await this.roleRepo.find();
        return this.response.render('user/create', {roles});
    }

    public async edit(id) {
        try {
            let user = this.userRepo.findOne(id);
            if (!user) throw new Error('User not found');
            return this.response.render('user/edit', {user});
        } catch (e) {
            console.log(e);
            return this.response.redirect('admin/users');
        }
    }

    public async store() {
        try {
            let {firstName, lastName, email, password} = this.request.body;
            password = await hash(password, 1);
            let user = {firstName, lastName, email, password};
            await this.userRepo.create(user);
            this.request.flash("success", "User has been saved successfully.");
            this.response.redirect("/admin/users/create");
        } catch (error) {
            console.log(error);
            this.response.redirect("/admin/users/create");
        }
    }
}