import { DataSource } from "typeorm";
import { envData } from "../environment";
import { User } from "./entities/user.entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: envData.db_host,
    port: envData.db_port,
    username: envData.db_username,
    password: envData.db_pass,
    database: envData.db_name,
    synchronize: true,
    logging: false,
    entities: [User],
    subscribers: [],
    migrations: [],
});