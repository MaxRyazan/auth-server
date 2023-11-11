import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from './auth.service';
import { AuthDto } from "./dto/authDto";
import { Tokens } from "../globalInterfaces/interfaces";
import * as process from "process";
import { RegisterDto } from "./dto/registerDto";
import { IUser } from "../globalClasses/IUser";

@Controller('/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(`/${process.env.VERSION}/auth`)
  login(@Body() authDto: AuthDto):Promise<Tokens> {
    return this.authService.login(authDto)
  }

  @Post(`/${process.env.VERSION}/register`)
  register(@Body() registerDto: RegisterDto):Promise<IUser> {
    return this.authService.register(registerDto)
  }
}
