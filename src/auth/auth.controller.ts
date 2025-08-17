import { Controller, HttpCode, HttpStatus, Body, Post, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signin(@Body() signInDto: Record<string, any>){
        console.log("Hello Login")
        return this.authService.signin(signInDto.username, signInDto.password)

    }

    @HttpCode(HttpStatus.OK)
    @Post('signup')
    async signup(@Body() signupDto: Record<string, any>){
        console.log("Hello Register")
        return this.authService.signup(signupDto.username, signupDto.password, signupDto.password_conf)
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
  }

}
