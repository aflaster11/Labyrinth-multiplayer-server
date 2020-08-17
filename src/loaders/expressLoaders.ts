import { Application } from 'express';
import * as express from 'express';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import { useExpressServer } from 'routing-controllers';
import { env } from '../env';
import {useSocketServer} from "socket-controllers";
import {Logger} from "../lib/logger";
//import * as nodemailer from 'nodemailer';

const log = new Logger(__dirname);

export const expressLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings) {
        //const connection = settings.getData('connection');

        /**
         * We create a new express server instance.
         * We could have also use useExpressServer here to attach controllers to an existing express instance.
         */
        let expressApp: Application = express();

        expressApp.use(express.urlencoded({extended: true}));

        useExpressServer(expressApp, {
            cors: true,
            classTransformer: true,
            routePrefix: env.app.routePrefix,
            defaultErrorHandler: false,
            /**
             * We can add options about how routing-controllers should configure itself.
             * Here we specify what controllers should be registered in our express server.
             */
            controllers: env.app.dirs.controllers,
            middlewares: env.app.dirs.middlewares,
            interceptors: env.app.dirs.interceptors,

            /**
             * Authorization features
             */
            //authorizationChecker: authorizationChecker(connection),
            // currentUserChecker: currentUserChecker(connection),
        });
        useSocketServer(expressApp, {
            controllers: env.app.dirs.wsControllers,
        });
        // Run application to listen on given port
        if (!env.isTest) {
            const server = expressApp.listen(env.app.port);
            settings.setData('express_server', server);
        }

        // Here we can set the data for other loaders
        settings.setData('express_app', expressApp);
        log.info("Server is configured");
    }
};
