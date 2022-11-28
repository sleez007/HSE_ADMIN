export interface AuthResponse {
    message: string | null;
    user: AuthUser;
    jwt: AuthToken;

}

export interface AuthToken {
    refreshToken: string | null,
    accessToken: string | null,
    refreshExpiry: string
}

export interface AuthUser {
    firstName: string;
    email: string;
    lastName: string;
}

export interface AuthenticatedData {
    user: AuthUser;
    tokens: AuthToken;
}