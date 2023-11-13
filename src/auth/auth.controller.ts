import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/local/sign-up')
    signUpLocal(){
        return this.authService.signUpLocal()
    }
    @Post('/local/sign-in')
    signInLocal(){
        return this.authService.signInLocal()
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
