import {connect, Mongoose} from "mongoose";

class MongoConnector {

    public connection: Mongoose;

    async connect(config): Promise<Mongoose> {
        let url = MongoConnector.url(config);
        return this.connection = await connect(url, config.options || []);
    }

    public static url(config): string {
        if (typeof  config["url"] === 'string' && config["url"].length > 0) return config["url"];
        let credentials = MongoConnector.credentials(config);
        credentials = (credentials.length > 0) ? "@" + credentials : "";
        return `mongodb://${credentials}${config["host"]}:${config["port"]}/${config["database"]}`;
    }

    private static credentials(config): string {
        if (typeof config["username"] === "undefined" || !(config["username"].length > 0)) return "";
        if (typeof config["password"] === "undefined" || !(config["password"].length > 0)) return "";

        let credentials = (typeof config["username"] !== "undefined") ? config["username"] : "";
        credentials += ":";
        credentials += (typeof config["password"] !== "undefined") ? config["password"] : "";
        return credentials;
    }

    public disconnect(): Promise<void> {
        return this.connection.disconnect();
    }
}

export {MongoConnector};