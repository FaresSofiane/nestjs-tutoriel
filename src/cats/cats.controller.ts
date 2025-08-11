import { Controller, Get, Req, Post, Header, Redirect, Query, Param, Body } from '@nestjs/common';
import { Request } from 'express';
import { CreateCatDto } from './create-cat.dto';
import { Cat } from './interfaces/cat.interface';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

   @Get()
   async findAll(): Promise<Cat[]> {
    return this.catsService.findAll()
   }

   @Post()
   async create(@Body() cat: Cat) {
    this.catsService.create(cat)
   }
}
