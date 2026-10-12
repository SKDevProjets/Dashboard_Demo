export interface LoginResponse {
    message: string;
    data: {
        token: string;
        expires: string;
        expires_in: number;
        user: {
            id: number;
            name: string;
            email: string;
            [key: string]: unknown;
        };
    };
}