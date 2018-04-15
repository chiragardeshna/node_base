import DataBaseServiceProvider from "../vendor/Nterprise/Database/ServiceProvider";
import ContactModule from "../app/Modules/Contact/ServiceProvider";

export default {
    modules: [
        DataBaseServiceProvider,
        ContactModule
    ]
};
