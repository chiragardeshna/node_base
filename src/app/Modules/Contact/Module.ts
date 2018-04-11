import ContactRouter from "./router";

export default class Module{

    public register(app){
        app.use('/contact', ContactRouter);
        return app;
    }
}
