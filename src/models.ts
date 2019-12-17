
interface IAppConfiguration {
    google: {
        key: string;
    };
    backend: {
        endpoint: string;
    };
}
export interface IWebpackConfiguration {
    mode: "development" | "production";
    name: "development" | "alpha" | "beta" | "production";
    port: number;

    app?: IAppConfiguration;

    path: {
        src: string;
        public: string;
        root: string;
    };
    output: {
        template: {
            index: string;
        }
    };
}

export interface IExternalLib {
    name: {
        module: string;
        dom: string;
    };
    cdn: {
        development: (v: string) => string;
        production: (v: string) => string;
    };
}

export interface IPackageJson {
    dependencies: Record<string, string>;
    name: string;
    version: string;
}
