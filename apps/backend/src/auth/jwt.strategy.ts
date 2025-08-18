import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

interface ReqToken extends Request {
    cookies: {
        token: string;
    };
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: ReqToken) => req?.cookies?.token || null
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_ACCESS_SECRET,
        });
    }

    validate(payload: { sub: string; name: string; email: string, title?: string; bio?: string; profile_picture_url?: string }) {
        return { 
            userId: payload.sub, 
            name: payload.name, 
            email: payload.email,
            title: payload.title,
            bio: payload.bio,
            profile_picture_url: payload.profile_picture_url,
        };
    }
}
