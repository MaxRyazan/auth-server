import { Injectable } from '@nestjs/common';
import { AuthDto } from "./dto/authDto";

@Injectable()
export class AuthService {

  getCredentials(authDto: AuthDto){
    console.log(authDto);
    return 'version-1'
  }
}
