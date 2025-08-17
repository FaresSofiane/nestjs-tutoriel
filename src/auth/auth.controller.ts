import { Controller, HttpCode, HttpStatus, Body, Post, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signin(@Body() signInDto: Record<string, any>){
        console.log("hello")
        return this.authService.signin(signInDto.username, signInDto.password)

    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
  }

}
