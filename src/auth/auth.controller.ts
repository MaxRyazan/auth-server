import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { Tokens } from "./types";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/local/sign-up')
    signUpLocal(@Body() dto: AuthDto): Promise<Tokens> {
        return this.authService.signUpLocal(dto)
    }
    @Post('/local/sign-in')
    signInLocal(@Body() dto: AuthDto): Promise<Tokens>{
        return this.authService.signInLocal(dto)
    }

    @Post('/logout')
    logout(){
        return this.authService.logout()
    }
    @Post('/refresh')
    refresh(){
        return this.authService.refreshTokens()
    }
}
