export type DbConfig = {
  /**
   * database connection username
   */
  username: string,
  /**
   * database connection password
   */
  password: string,
  /**
   * database connection port
   * @default 3306
   */
  port?: number,
  /**
   * database name
   */
  database: string,
  /**
   * database connection host
   * @default localhost
   */
  host?: string,
  /**
   * database type
   * @default mysql
   */
  type?: 'mysql',
}
