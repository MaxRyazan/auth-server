import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { AuthDto } from "./dto/authDto";
import { USER_DB } from "../../USERS";
import { IUser } from "../globalClasses/IUser";
import { Tokens } from "../globalInterfaces/interfaces";
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt";
import { RegisterDto } from "./dto/registerDto";
import * as process from "process";

@Injectable()
export class AuthService {

  constructor(private readonly jwtService: JwtService) {}

  async login(authDto: AuthDto): Promise<Tokens>{
    const existingUser: IUser|null = USER_DB.find((user: IUser):boolean => user.email === authDto.email)
    if(!existingUser) {
      throw new NotFoundException('Неверные данные пользователя!')
    }
    if(await bcrypt.compare(authDto.password, existingUser.password)){
      const accessToken: string = this.jwtService.sign({username: existingUser.username},
        { secret: process.env.JWT_SECRET })
      const refreshToken: string = this.jwtService.sign({username: existingUser.username},
        { secret: process.env.JWT_SECRET, expiresIn: process.env.JWT_REFRESH_EXP })

      return { accessToken, refreshToken }

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
    return new IUser(registerDto.username, registerDto.email, await bcrypt.hash(registerDto.password, 5))
  }


  async refresh(authDto: AuthDto): Promise<{accessToken: string}>{
    const existingUser: IUser|null = USER_DB.find((user: IUser):boolean => user.email === authDto.email)
    if(!existingUser) {
      throw new NotFoundException('Неверные данные пользователя!')
    }
    if(await bcrypt.compare(authDto.password, existingUser.password)){
      const accessToken: string = this.jwtService.sign({username: existingUser.username},
        { secret: process.env.JWT_SECRET })

      return { accessToken }

    } else {
      throw new NotFoundException('Неверные данные пользователя!')
    }
  }


}
