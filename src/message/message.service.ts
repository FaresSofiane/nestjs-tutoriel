import { Injectable } from '@nestjs/common';
import { Messages } from './message.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MessageService {

    //   constructor(@InjectRepository(User) private repo: Repository<User>) {}
    constructor(@InjectRepository(Messages) private messages: Repository<Messages>) {}


    async addMessage(content: string){
        const entity = this.messages.create({ content })
        return await this.messages.save(entity)
    }

    async findAll(){


        return  this.messages.find({
            select:["content"]
        });
    }

}
