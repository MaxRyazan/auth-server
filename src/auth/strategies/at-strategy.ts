import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as process from "process";
import { Injectable } from "@nestjs/common";
import { PayloadType } from "../types";


@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt'){

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET_AT_STRATEGY
        });
    }

    async validate(payload: PayloadType): Promise<PayloadType>{
        return payload
    }
}