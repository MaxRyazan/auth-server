routes :

    @Post('auth/local/sign-up')
    @HttpCode(HttpStatus.CREATED)
    signUpLocal(@Body() dto: AuthDto): Promise<Tokens> {}

    @Post('/local/sign-in')
    @HttpCode(HttpStatus.OK)
    signInLocal(@Body() dto: AuthDto): Promise<Tokens>{}

    @Post('/logout')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AtGuard)
    logout(): Promise<boolean>{}

    @Post('/refresh')
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
