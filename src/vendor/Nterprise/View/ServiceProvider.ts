import {renderFile} from "pug";
import Application from "../Container/Application";
import * as load from "pug-load";
import * as fs from "fs";
import * as path from "path";
import {ServiceProvider as ContractServiceProvider} from "../Contracts/ServiceProvider";

class ServiceProvider implements ContractServiceProvider {

    public app: Application;

    public async register(app: Application) {

        let baseDir = "D:" + path.sep + "websites" + path.sep + "node_base" + path.sep + "dist";

        let view = app.express.get('view');

        let viewDirs = app.express.get("views");

        app.express.engine("pug", (filePath, options, fn) => {
            if (options.compileDebug == undefined && process.env.NODE_ENV === 'production') {
                options.compileDebug = false;
            }

            options.plugins = [
                {
                    resolve: (filename, source, options) => {
                        filename = filename.replace(new RegExp('"', 'g'), '');

                        for (let i = 0; i < viewDirs.length; i++) {
                            let file = viewDirs[i] + path.sep + filename;
                            if (fs.existsSync(file)) {
                                filename = file.replace(baseDir, '');

                                // Make it relative by prepanding forward slash.
                                filename = filename.replace("\\", "/");

                                break;
                            }
                        }

                        options.basedir = baseDir;

                        return load.resolve(filename, source, options);
                    }
                }
            ];

            renderFile(filePath, options, fn);
        });

        app.express.set('view engine', "pug");

        return app;
    }
}

export default new ServiceProvider();
