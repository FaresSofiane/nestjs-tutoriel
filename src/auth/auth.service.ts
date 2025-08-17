import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private usersServices: UsersService, private jwtService: JwtService) {}

    async signin(username:string, password: string){
        const user = await this.usersServices.findone(username);
        console.log(user)

        if (user[0]?.password !== password){
            throw new UnauthorizedException();
        }

        const payload = {sub: user[0]?.id, username: user[0]?.username};

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async signup(username:string, password:string, password_conf: string){
        if (password !== password_conf){
            throw new BadRequestException();
        }

        return this.usersServices.create(username, password);
        
    

    }
    

}
