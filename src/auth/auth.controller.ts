import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { Tokens } from "./types";
import { AuthGuard } from "@nestjs/passport";
import { Request} from "express";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/local/sign-up')
    @HttpCode(HttpStatus.CREATED)
    signUpLocal(@Body() dto: AuthDto): Promise<Tokens> {
        return this.authService.signUpLocal(dto)
    }
    @Post('/local/sign-in')
    @HttpCode(HttpStatus.OK)
    signInLocal(@Body() dto: AuthDto): Promise<Tokens>{
        return this.authService.signInLocal(dto)
    }

    @Post('/logout')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('jwt'))
    logout(@Req() req: Request): Promise<boolean>{
        const user:Express.User = req.user
        return this.authService.logout(user['sub'])
    }
    @Post('/refresh')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('jwt-refresh'))
    refresh(@Req() req: Request): Promise<Tokens>{
        const user = req.user
        return this.authService.refreshTokens(user['sub'], user['refreshToken'])
    }
}
