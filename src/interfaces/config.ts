export interface ConfigOptions {
    app: {
        PORT: string | number;
    };
}

export interface Config {
    [key: string]: ConfigOptions;
}