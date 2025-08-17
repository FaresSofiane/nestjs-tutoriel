import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './dto/user.dto';
import { Users } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class UsersService {

    constructor(@InjectRepository(Users) private messages: Repository<Users>) {}
    

    async findoneById(id: number): Promise<User | undefined>{
        return this.users.find(user => user.userId === id);
    }

    async findone(username: string): Promise<User | undefined>{
        return this.users.find(user => user.username === username);
    }



}
