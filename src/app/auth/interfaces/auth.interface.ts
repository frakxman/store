export interface AuthResp {
    userId: number;
    userName: string;
    email: string;
}

export interface TokenResp extends AuthResp {
    access_token: string;
}