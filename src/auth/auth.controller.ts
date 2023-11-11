import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from './auth.service';
import { AuthDto } from "./dto/authDto";
import { Tokens } from "../globalInterfaces/interfaces";
import { RegisterDto } from "./dto/registerDto";
import { IUser } from "../globalClasses/IUser";

@Controller('/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(`/v1/login`)
  login(@Body() authDto: AuthDto):Promise<Tokens> {
    return this.authService.login(authDto)
  }

  @Post(`/v1/register`)
  register(@Body() registerDto: RegisterDto):Promise<IUser> {
    return this.authService.register(registerDto)
  }
  @Post(`/v1/refresh`)
  refresh(@Body() registerDto: RegisterDto):Promise<{ accessToken: string }> {
    return this.authService.refresh(registerDto)
  }
}
