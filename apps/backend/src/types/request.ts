import type { Request } from 'express';
import type { userPayload } from './users';
export interface ReqToken extends Request {
    csrfToken: () => string;
}

export interface ReqProfile extends Request {
    user: userPayload;
}