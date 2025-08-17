import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private usersServices: UsersService, private jwtService: JwtService) {}

    async signin(username:string, password: string){
        const user = await this.usersServices.findone(username);

        if (user?.password !== password){
            throw new UnauthorizedException();
        }

        const payload = {sub: user.userId, username: user.username};

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

}
