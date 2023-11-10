import { Length } from "class-validator";

export class AuthDto {

  @Length(3, 20, {message: 'Длина должна быть от 3 до 20 символов!'})
  username: string

  @Length(10, 50, {message: 'Длина от 10 до 50 символов!'})
  password: string

}