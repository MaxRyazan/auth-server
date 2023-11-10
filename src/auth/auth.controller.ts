import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from './auth.service';
import { AuthDto } from "./dto/authDto";

@Controller('/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(`/v1/auth`)
  getCredentials(@Body() authDto: AuthDto):string {
    return this.authService.getCredentials(authDto)
  }
}
