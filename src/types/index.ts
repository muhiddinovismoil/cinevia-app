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
    CARTOON_SERIES = "CARTOON_SERIES",
}

export enum UploadTypes {
    LOCAL = "LOCAL",
    EXTERNAL = "EXTERNAL",
}
export enum SortEnum {
    DATE_ASC = "DATE_ASC",
    DATE_DESC = "DATE_DESC",
    TITLE_ASC = "TITLE_ASC",
    TITLE_DESC = "TITLE_DESC",
}

export interface MovieFetchProps {
    pageNumber?: number;
    pageSize?: number;
    search?: string;
    categoryId?: string;
    movieType?: MovieTypes;
    sort?: SortEnum;
}
