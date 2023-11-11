import { IsEmail, Length } from "class-validator";

export class RegisterDto {

  @Length(3, 20, {message: 'Длина должна быть от 3 до 20 символов!'})
  username: string

  @IsEmail()
  email: string

  @Length(10, 50, {message: 'Длина от 10 до 50 символов!'})
  password: string

  @Length(10, 50, {message: 'Длина от 10 до 50 символов!'})
  confirmPassword: string

}