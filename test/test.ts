import {MongoConnector} from "../src/app/Services/Database/MongoConnector";

import 'mocha';
import {expect} from 'chai';

describe('MongoConnector.url()', () => {
    it('should return mongodb connection url.', () => {
        let config = {
            url: "mongodb://localhost:27017/node_base_typescript",
            host: "localhost",
            port: 27017,
            database: "node_base_typescript",
            username: "",
            password: ""
        };
        expect(MongoConnector.url(config)).to.equal("mongodb://localhost:27017/node_base_typescript");
    });
});

describe('MongoConnector.url()', () => {
    it('should return mongodb connection url using parameters if no url specified.', () => {
        let config = {
            host: "localhost",
            port: 27017,
            database: "node_base_typescript",
            username: "",
            password: ""
        };
        expect(MongoConnector.url(config)).to.equal("mongodb://localhost:27017/node_base_typescript");
    });
});

describe('(new MongoConnector()).connect()', () => {
    it('should connect to mongodb database.', async () => {
        let config = {
            host: "localhost",
            port: 27017,
            database: "node_base_typescript4",
            username: "",
            password: ""
        };

        let connector = new MongoConnector;
        await connector.connect(config);
    });
});