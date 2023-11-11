import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from "@nestjs/jwt";
import * as process from "process";

@Module({
  providers: [AuthService, JwtService],
  controllers: [AuthController],
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {expiresIn: process.env.JWT_ACCESS_EXP}
  })]
})
export class AuthModule {}
