import Application from "../Container/Application";

export interface ServiceProvider {
    register(app: Application): Promise<Application>;
}