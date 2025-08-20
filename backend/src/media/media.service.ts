import { Injectable, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { first, firstValueFrom } from 'rxjs';

@Injectable()
export class MediaService {
    constructor(private httpService:HttpService) {}

    tmdb_api_key = process.env.TMDB_API_KEY || ""
    tmdb_url = process.env.TMDB_API_URL || ""

    async find(movie:string){
        
        if (this.tmdb_api_key === "" || this.tmdb_url === ""){
            throw new ServiceUnavailableException();
        }

        const resp = await firstValueFrom(this.httpService.get(`${this.tmdb_url}/search/movie?query=${encodeURIComponent(movie)}&include_adult=false&language=fr-FR&page=1`,{
            headers:{
                Accept:"application/json",
                Authorization:`Bearer ${this.tmdb_api_key}`
            }
        }));

        const data = resp.data;

        if (!data?.results || data.results.length === 0) {
            return [];
        }

        const response = data.results.map((element: {
            original_title: string;
            overview: string;
            popularity: number;
            poster_path: string;
            backdrop_path: string;
            poster_path_w500: string;
            backdrop_path_w500: string;
            release_date: string;
        }) => ({
            title: element.original_title,
            overview: element.overview,
            backdrop_path: "https://image.tmdb.org/t/p/original"+element.backdrop_path,
            poster_path: "https://image.tmdb.org/t/p/original"+element.poster_path,
            backdrop_path_w500: "https://image.tmdb.org/t/p/w500"+element.backdrop_path,
            poster_path_w500: "https://image.tmdb.org/t/p/w500"+element.poster_path,
            release_date: element.release_date,
            popularity: element.popularity,

        }));

        return response;

    }

    async findProvider(movieId:number){
        if (this.tmdb_api_key === "" || this.tmdb_url === ""){
            throw new ServiceUnavailableException();
        }

        const resp = await firstValueFrom(this.httpService.get(`${this.tmdb_url}/movie/${movieId}/watch/providers`,{
            headers:{
                Accept:"application/json",
                Authorization:`Bearer ${this.tmdb_api_key}`
            }
        }))

        if (resp.data?.success === false || resp.data?.status_code === 34) {
           throw new NotFoundException();
        } else {
            return resp.data?.results?.FR
        }
        
    }

    async allTrending(isWeek: boolean){

        const time_window = isWeek ? "week" : "day";

        if (this.tmdb_api_key === "" || this.tmdb_url === ""){
            throw new ServiceUnavailableException();
        }

        //   url: 'https://api.themoviedb.org/3/trending/movie/day?language=fr-FR',


        const resp = await firstValueFrom(this.httpService.get(`${this.tmdb_url}/trending/movie/${time_window}?language=fr-FR`,{
            headers:{
                Accept:"application/json",
                Authorization:`Bearer ${this.tmdb_api_key}`
            }
        }));



        if (resp.data?.success === false || resp.data?.status_code === 34) {
           throw new ServiceUnavailableException();
        } else {
            return resp.data?.results
        }

    }
}