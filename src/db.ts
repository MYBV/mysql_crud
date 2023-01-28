//###############################################################################
import { createConnection } from "typeorm";
import UsersEntity from "./entities/user.entity";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "./config";
//###############################################################################

//###############################################################################
export const connectDB = async () => {
    await createConnection({
        type: "mysql",
        username: DB_USER,
        password: DB_PASSWORD,
        port: Number(DB_PORT),
        host: DB_HOST,
        database: DB_NAME,
        entities: [UsersEntity],
        synchronize: false,
        ssl: false,
    });
};
//###############################################################################
