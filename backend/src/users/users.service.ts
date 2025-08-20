import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './dto/user.dto';
import { Users } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class UsersService {

    constructor(@InjectRepository(Users) private users: Repository<Users>) {}

    async create(username: string, password: string){
        const user = this.users.create({username, password})
        return await this.users.save(user)
    }

    async findoneById(id: string): Promise<User | undefined | any>{

        return await this.users.find({
            select : {
                id: true,
                username: true,
                password: true,
                createdAt: true
            },
            where : [
                {id: id}
            ]
        })
    }

    async findone(username: string): Promise<User | undefined | any>{
        return await this.users.find({
            select : {
                id: true,
                username: true,
                password: true,
                createdAt: true
            },
            where : [
                {username: username}
            ]
        })
    }



}
