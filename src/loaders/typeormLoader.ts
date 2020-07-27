import { createConnection, getConnectionOptions } from 'typeorm';
import { env } from '../env';
import {MicroframeworkLoader, MicroframeworkSettings} from "microframework-w3tec";
import { Logger } from "../lib/logger";

const log = new Logger(__dirname);

export const typeormLoader: MicroframeworkLoader = async (settings: MicroframeworkSettings | undefined) => {
    const loadedConnectionOptions = await getConnectionOptions();
    const connectionOptions = Object.assign(loadedConnectionOptions, {
        type: env.db.type as any, // See createConnection options for valid types
        host: env.db.host,
        port: env.db.port,
        username: env.db.username,
        password: env.db.password,
        database: env.db.database,
        synchronize: env.db.synchronize,
        logging: env.db.synchronize,
        dropSchema: env.db.dropSchema,
        entities: env.app.dirs.entities,
        migrations: env.app.dirs.migrations,

    });
    const connection = await createConnection(connectionOptions);
    log.info('Database is connected');
    await connection.synchronize();
    if (settings) {
        settings.setData('connection', connection);
        settings.onShutdown(() => connection.close());
    }
};
