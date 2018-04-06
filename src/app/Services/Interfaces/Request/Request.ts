import {Request as expressRequest} from "express";

export default interface Request extends expressRequest {
    get(key?: string): any;

    fullUrl(): string;
}