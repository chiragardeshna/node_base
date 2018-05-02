import AppServiceProvider from "../app/ServiceProvider";
import DataBaseServiceProvider from "../vendor/Nterprise/Database/ServiceProvider";
import SessionServiceProvider from "../vendor/Nterprise/Session/ServiceProvider";
import ViewServiceProvider from "../vendor/Nterprise/View/ServiceProvider";
import ContactModule from "../app/Modules/Contact/ServiceProvider";
import AdminServiceProvider from "../app/Modules/Admin/ServiceProvider";

export default {
    modules: [
        AppServiceProvider,
        DataBaseServiceProvider,
        SessionServiceProvider,
        AdminServiceProvider,
        ContactModule,
        ViewServiceProvider
    ]
};
