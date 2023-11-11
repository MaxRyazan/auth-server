import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { AuthDto } from "./dto/authDto";
import { USER_DB } from "../../USERS";
import { IUser } from "../globalClasses/IUser";
import { Tokens } from "../globalInterfaces/interfaces";
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt";
import { RegisterDto } from "./dto/registerDto";

@Injectable()
export class AuthService {

  constructor(private readonly jwtService: JwtService) {}

  async login(authDto: AuthDto): Promise<Tokens>{
    const existingUser: IUser|null = USER_DB.find((user: IUser):boolean => user.email === authDto.email)
    if(!existingUser) {
      throw new NotFoundException('Неверные данные пользователя!')
    }
    if(await bcrypt.compare(authDto.password, existingUser.password)){
      const payload: { username: string } = {
        username: existingUser.username
      }
      const accessToken: string = this.jwtService.sign(payload)

      return { accessToken, refreshToken: '' }

    } else {
      throw new NotFoundException('Неверные данные пользователя!')
    }
  }

  async register(registerDto: RegisterDto): Promise<IUser> {
    if (registerDto.password !== registerDto.confirmPassword) {
      throw new BadRequestException('Пароли не совпадают!')
    }
    const existingUser: IUser | null = USER_DB.find((user: IUser): boolean => user.email === registerDto.email)
    if (existingUser) {
      throw new BadRequestException('Пользователь с такими данными уже зарегистрирован!')
    }
    const newUser:IUser = new IUser(registerDto.username, existingUser.email, await bcrypt.hash(registerDto.password, 5))
    USER_DB.push(newUser)
    return newUser
  }


}
