import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";
import  * as bcrypt from 'bcrypt'
import { JwtService } from "@nestjs/jwt";
import * as process from "process";
import { Tokens } from "./types";
import { User } from "@prisma/client";

@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService,private jwtService: JwtService) {}

    async signUpLocal(dto: AuthDto): Promise<Tokens>{
        const newUser: User = await this.prisma.user.create({
            data: {
                email: dto.email,
                hashPass: await this.hashData(dto.password)
            }
        })
        const tokens: Tokens = await this.generateTokens(newUser.id, newUser.email)
        await this.updateRtHash(newUser.id, tokens.refreshToken)
        return tokens

    }
    async signInLocal(dto: AuthDto){
        const user = await this.prisma.user.findUnique({
            where:{
                email : dto.email
            }
        })
        if(!user){
            throw new NotFoundException("Credentials WRONG.")
        }
        const passMatches: boolean = await bcrypt.compare(dto.password, user.hashPass)
        if(!passMatches){
            throw new NotFoundException("Credentials WRONG.")
        }
        const tokens: Tokens = await this.generateTokens(user.id, user.email)
        await this.updateRtHash(user.id, tokens.refreshToken)
        return tokens
    }
    logout(){

    }
    refreshTokens(){

    }

    async hashData(data: string): Promise<string>{
        return await bcrypt.hash(data, 10)
    }

    async generateTokens(userId: number, email: string): Promise<Tokens>{
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync({
                sub: userId,
                email
            }, {
                secret: process.env.SECRET_AT_STRATEGY,
                expiresIn: 60 * 5
            }),
            this.jwtService.signAsync({
                sub: userId,
                email
            }, {
                secret: process.env.SECRET_RT_STRATEGY,
                expiresIn: 60 * 60 * 24 * 7
            })
        ])
        return  {
            accessToken: at,
            refreshToken: rt
        }
    }

    async updateRtHash(userId: number, rt: string): Promise<void> {
        const hash: string = await this.hashData(rt)
        await this.prisma.user.update({
            where:{
                id: userId
            },
            data : {
                hashRT: hash
            }
        })
    }
}
