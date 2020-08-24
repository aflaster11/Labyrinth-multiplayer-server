import { Application } from 'express';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import { env } from '../env';
import {useSocketServer} from "socket-controllers";
import {Logger} from "../lib/logger";
import * as http from "http";
import * as socketIo from "socket.io";

const log = new Logger(__dirname);

export const socketLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings) {
        //const connection = settings.getData('connection');

        /**
         * We create a new express server instance.
         * We could have also use useExpressServer here to attach controllers to an existing express instance.
         */
        let expressApp: Application = settings.getData('express_app');

        let server: http.Server = http.createServer(expressApp);
        const socketHandler = socketIo(server);

        useSocketServer(socketHandler, {
            controllers: env.app.dirs.wsControllers,
        });


        // Here we can set the data for other loaders
        settings.setData('express_app', expressApp);
        log.info("Socket handler is configured");
    }
};
