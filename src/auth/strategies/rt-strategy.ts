import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as process from "process";
import {Request} from 'express'
import { Injectable } from "@nestjs/common";
import { PayloadType } from "../types";


@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh'){

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET_RT_STRATEGY,
            passReqToCallback: true
        });
    }

    async validate(req: Request, payload: PayloadType): Promise<PayloadType & {refreshToken: string}>{
        const refreshToken:string = req.get('authorization').replace('Bearer ', '').trim()
        return {
            ...payload,
            refreshToken
        }
    }
}