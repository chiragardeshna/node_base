import AppServiceProvider from "../app/ServiceProvider";
import DataBaseServiceProvider from "../vendor/Nterprise/Database/ServiceProvider";
import ContactModule from "../app/Modules/Contact/ServiceProvider";
import AdminServiceProvider from "../app/Modules/Admin/ServiceProvider";

export default {
    modules: [
        AppServiceProvider,
        DataBaseServiceProvider,
        AdminServiceProvider,
        ContactModule
    ]
};
