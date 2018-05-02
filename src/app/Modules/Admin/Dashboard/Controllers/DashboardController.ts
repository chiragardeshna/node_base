import Controller from "../../../../../vendor/Nterprise/Http/Controller";

export default class DashboardController extends Controller {

    public index() {
        this.response.render("dashboard/index");
    }
}