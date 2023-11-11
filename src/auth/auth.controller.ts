import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from './auth.service';
import { AuthDto } from "./dto/authDto";
import { Tokens } from "../globalInterfaces/interfaces";

@Controller('/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(`/v1/auth`)
  login(@Body() authDto: AuthDto):Promise<Tokens> {
    return this.authService.login(authDto)
  }
}
