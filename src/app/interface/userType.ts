export interface LoginInfo {
    username: string;
    password: string;
}
export interface LoginRespInfo {
    message: string|JSON;
    code: string;
}
export interface LogOutRespInfo {
    message?: string;
    err?: JSON;
    code: string;
}
export interface SignUpInfo {
    username: string;
    password: string;
    email: string;
}
export interface SignUpRespInfo {
    message: string|JSON;
    code: string;
}
export interface QueryUsernameResp {
    message?: JSON;
    usernames?: string[];
    code: string;
}
export interface GeneralResp {
    message: string|JSON;
    code: string;
}
export interface PicInfo {
    avatar: string;
}
export interface RestPSInfo {
    old: string;
    new: string;
}