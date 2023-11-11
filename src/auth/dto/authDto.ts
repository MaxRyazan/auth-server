import { IsEmail, Length } from "class-validator";

export class AuthDto {

  @IsEmail()
  email: string

  @Length(10, 50, {message: 'Длина от 10 до 50 символов!'})
  password: string

}