export type BuildMode = 'production' | 'development';

export interface BuildPaths {
    entry: string;
    build: string;
    src: string;
    html: string;
    favicon: string;
}

export interface BuildEnv {
    mode: BuildMode;
    port: number;
}

export interface BuildOptions {
    mode: BuildMode;
    paths: BuildPaths;
    isDev: boolean;
    port: number;
}
