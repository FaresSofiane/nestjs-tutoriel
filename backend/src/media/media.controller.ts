import { Controller, Get, Param } from '@nestjs/common';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {

    constructor(private mediaService: MediaService){}

    @Get("trending")
    findTrending(){
        return this.mediaService.allTrending(false)
    }

    @Get('id/:movie')
    findMovie(@Param('movie') movie:string){
        return this.mediaService.find(movie)
    }


    @Get('id/:movieId/provider')
    findMovieProvider(@Param('movieId') movieId:number){
        console.log(movieId, "Movie Id")
        return this.mediaService.findProvider(movieId)
    }

    

}
