import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessageService } from "./message.service";
import { MessageDto } from './models/Message.model';

@Controller('message')
export class MessageController {

    constructor(private messageService: MessageService){}

    @Get()
    async getAll(): Promise<any> {
        return this.messageService.findAll()
    }

    @Post()
    async addMessage(@Body() body: MessageDto): Promise<string> {
        const {content} = body

        this.messageService.addMessage(content)

        return "Message ajouté"
    }
}
