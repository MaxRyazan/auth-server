export class IUser {
  username: string
  email: string
  password: string
  refreshToken: string
  constructor(username: string, email: string, password: string) {
    this.username = username
    this.email = email
    this.password = password
    this.refreshToken = null
  }
}