export interface BaseResponseI<T> {
    statusCode: number;
    message: string;
    data: T;
}

export interface UploadData {
    filename: string;
    mimetype: string;
    size: number;
    path: string;
}

export enum MovieTypes {
    MOVIE = "MOVIE",
    SERIES = "SERIES",
    CARTOON = "CARTOON",
}

export enum UploadTypes {
    LOCAL = "LOCAL",
    EXTERNAL = "EXTERNAL",
}
