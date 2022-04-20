"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
var Contribution_1 = require("./entity/Contribution");
require("reflect-metadata");
var typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "test",
    database: "rowland_portfolio",
    synchronize: true,
    logging: false,
    entities: [Contribution_1.Contribution],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map