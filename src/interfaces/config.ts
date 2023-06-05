/* export interface ConfigOptions {
    app: {
        PORT: string | number;
    };
    db: {mongoUri: string}
}
 */

export interface AppConfig {
    PORT: string | number;
  }
  export interface DbConfig {
    URI?: string;
  }

  export interface ConfigOptions {
    app: AppConfig;
    db: DbConfig;
  }
  export interface Config {
    [key: string]: ConfigOptions;
  }