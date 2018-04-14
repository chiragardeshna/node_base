import DataBaseServiceProvider from "../vendor/Nterprise/Database/ServiceProvider";
import ContactModule from "../app/Modules/Contact/Module";

export default {
    modules: [
        DataBaseServiceProvider,
        ContactModule
    ]
};
