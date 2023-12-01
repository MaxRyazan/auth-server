import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { Tokens } from "./types";
import { AtGuard, RtGuard } from "../guards";
import { GetCurrentUserDecorator, GetCurrentUserIdDecorator } from "../decorators";

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
    @UseGuards(AtGuard)
    logout(@GetCurrentUserIdDecorator() userId: number): Promise<boolean>{
        console.log('logout');
        return this.authService.logout(userId)
    }
    @Post('/refresh')
    @HttpCode(HttpStatus.OK)
    @UseGuards(RtGuard)
    refresh(
        @GetCurrentUserDecorator('refreshToken') rt: string,
        @GetCurrentUserIdDecorator() userId: number
    ): Promise<Tokens>{
        return this.authService.refreshTokens(userId, rt)
    }
}
