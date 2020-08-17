import 'reflect-metadata';

import { bootstrapMicroframework } from 'microframework-w3tec';
import { Logger } from './lib/logger';
import { expressLoader } from './loaders/expressLoaders';
import { firebaseLoader } from "./loaders/firebaseLoader";
import { typeormLoader } from './loaders/typeormLoader';
import { winstonLoader } from './loaders/winstonLoader';
import {banner} from "./lib/banner";
import {iocLoader} from "./loaders/iocLoader";


const log = new Logger(__filename);

bootstrapMicroframework({
    /**
     * Loader is a place where you can configure all your modules during microframework
     * bootstrap process. All loaders are executed one by one in a sequential order.
     */
    loaders: [
        winstonLoader,
        iocLoader,
        typeormLoader,
        expressLoader,
        firebaseLoader,
    ],
})
    .then(() => {banner(log)} )
    .catch(error => log.error('Application is crashed: ' + error));
