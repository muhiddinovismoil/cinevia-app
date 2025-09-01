export interface BaseResponseI<T> {
    statusCode: number;
    message: string;
    data: T;
}
