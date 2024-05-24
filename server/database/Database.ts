// 这是对mysql 查询语句的封装

import type { DbConfig } from "~/types/database";
import { Sequelize } from "sequelize";

class Database {
  instance: any;
  config: DbConfig;
  constructor(config: DbConfig) {
    this.config = Object.assign({
      host: 'localhost',
      port: 3306,
      type: 'mysql',
    }, config);
    try {
      this.instance = new Sequelize(this.config.database, this.config.username, this.config.password, {
        host: this.config.host,
        dialect: this.config.type,
      });
    } catch (e) {
      console.log(e)
      console.log("database connect fail");
    }
  }
}

export default Database;
