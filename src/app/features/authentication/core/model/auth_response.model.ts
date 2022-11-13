export interface AuthResponse {
    message: string;
    user: AuthUser;
    tokens: AuthToken;

}

export interface AuthToken {
    refresh_token: string | null,
    access_token: string | null,
    temp_token: string | null,
}

export interface AuthUser {
    firstName: string;
    email: string;
}

export interface AuthenticatedData {
    user: AuthUser;
    tokens: AuthToken;
}