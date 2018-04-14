import ContactRouter from "./router";

export default class Module {

    public register(app) {
        app.express.use('/contact', ContactRouter);

        app.viewDir

        return app;
    }
}
