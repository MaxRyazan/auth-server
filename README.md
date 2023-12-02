docker-compose up
prisma migrate dev
npm run start:dev

routes :
```js
    @Post('auth/local/sign-up')
    @HttpCode(HttpStatus.CREATED)
    signUpLocal(@Body() dto: AuthDto): Promise<Tokens> {}

    @Post('auth/local/sign-in')
    @HttpCode(HttpStatus.OK)
    signInLocal(@Body() dto: AuthDto): Promise<Tokens>{}

    @Post('auth/logout')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AtGuard)
    logout(): Promise<boolean>{}

    @Post('auth/refresh')
    @HttpCode(HttpStatus.OK)
    @UseGuards(RtGuard)
    refresh(): Promise<Tokens>{}


export class AuthDto {
    @IsEmail()
    email: string
    @IsNotEmpty()
    @IsString()
    password: string
}
```
