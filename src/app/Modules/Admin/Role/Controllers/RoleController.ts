import Controller from "../../../../../vendor/Nterprise/Http/Controller";
import {inject} from "inversify";

export default class RoleController extends Controller {

    protected roleRepo;

    constructor(@inject("MODEL_ROLE") roleRepo) {
        super();
        this.roleRepo = roleRepo;
    }

    public async index() {
        let roles = await this.roleRepo.find();
        return this.response.render("role/index", {roles});
    }

    public create() {
        return this.response.render("role/create");
    }

    public async edit(id) {
        try {
            let role = await this.roleRepo.findOne({_id: id});
            if (!role) throw "Role not found.";
            return this.response.render("role/edit", {role});
        } catch (e) {
            console.log(e);
            this.response.redirect("/admin/roles");
        }
    }

    public async store() {
        try {
            let [name, description] = [this.request.body.name, this.request.body.description];
            let role = {name, description};
            await this.roleRepo.create(role);
            this.request.flash("success", "Role has been saved successfully.");
            this.response.redirect("/admin/roles/create");
        } catch (error) {
            console.log(error);
            this.response.redirect("/admin/roles/create");
        }
    }
}