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

    validate(payload: { sub: string; name: string; date_of_birth: string; phone: string; email: string, title?: string; bio?: string; profile_picture_url?: string, country?: string; createdAt?: string }) {
        return { 
            userId: payload.sub, 
            name: payload.name, 
            date_of_birth: payload.date_of_birth,
            phone: payload.phone,
            email: payload.email,
            title: payload.title,
            bio: payload.bio,
            country: payload.country,
            profile_picture_url: payload.profile_picture_url,
            createdAt: new Date().toISOString()
        };
    }
}
