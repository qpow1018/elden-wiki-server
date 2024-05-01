import {Express} from "express";
export { PoolClient } from "pg";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ApiHandler = (path: string, callback: (any: any) => any) => any;

export type MultipartFormApiHandler = {
    post: (path: string, formFileDescriptor: any, callback: (any: any) => any) => any,  // eslint-disable-line @typescript-eslint/no-explicit-any
    put: (path: string, formFileDescriptor: any, callback: (any: any) => any) => any    // eslint-disable-line @typescript-eslint/no-explicit-any
};

interface ApiHandlers {
	get: ApiHandler;
	post: ApiHandler;
	put: ApiHandler;
	delete: ApiHandler;
}

interface API extends ApiHandlers {
	init: (app: Express) => void;
	guest: ApiHandlers;
	admin: ApiHandlers;
}

interface DefaultApiParams<T> {
    params: any,    // eslint-disable-line @typescript-eslint/no-explicit-any
    query: any,     // eslint-disable-line @typescript-eslint/no-explicit-any
    body: T,
    useragent?: string
    cookies: any    // eslint-disable-line @typescript-eslint/no-explicit-any
}

interface UserInfo {
    email: string;
    userId: number;
	lastAccessTime: number;
	ip: string;
}

interface DefaultUserApiParams extends DefaultApiParams<undefined> {
    userInfo: UserInfo;
}

interface GuestApiParams<T> extends DefaultApiParams<T> {
    userInfo?: UserInfo | null
}

interface DefaultGuestApiParams extends DefaultApiParams<undefined> {
    userInfo: UserInfo | null
}


interface UserApiParams<T> extends DefaultApiParams<T> {
    userInfo: UserInfo;
}

type RouterParameters = { app: Express, api: API };

// for test checkerEx
enum PlatformType {
    youtube = 'YOUTUBE',
    instagram = 'INSTAGRAM',
    tiktok = 'TIKTOK',
    facebook = 'FACEBOOK',
    etc = 'ETC'
}


export type { RouterParameters }
export {
    API, ApiHandlers, ApiHandler,
    UserInfo,
    DefaultUserApiParams, UserApiParams, GuestApiParams, DefaultGuestApiParams,
	PlatformType
}
