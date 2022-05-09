import {
  Body,
  Controller, Delete, Get,
  Param, Post
} from "@nestjs/common";
import { FilmsService } from './films.service';

import { AddFilmDto } from "./DTO/add-film.dto";
import { AddActorsInFilmDto } from "./DTO/addActorsInFilm.dto";
import { AddGenresInFilmDto } from "./DTO/addGenresInFilm.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Film } from "./entities/films.entity";

@ApiTags('Фильмы')
@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @ApiOperation({ summary: 'Добавить фильм бд' })
  @ApiResponse({ status: 200, type: String })
  @ApiResponse({status: 400, description: 'Не удалось добавить фильм в бд' })
  @Post('add-film')
  async addFilm(@Body() addFilmDto: AddFilmDto, ) {
    return await this.filmsService.addFilm(addFilmDto)
  }

  @ApiOperation({ summary: 'Удалить фильм бд' })
  @ApiResponse({ status: 200, description: 'Фильм успешно удален' })
  @ApiResponse({status: 400, description: 'Не удалось удалить фильм из бд'})
  @Delete('delete-film/:id')
  async deleteFilm(@Param('id') id: number) {
    return this.filmsService.deleteFilm(id)
  }

  @ApiOperation({ summary: 'Получить фильм по id' })
  @ApiResponse({ status: 200, type: Film })
  @ApiResponse({status: 404, description: 'Фильм не найден'})
  @Get(':id')
  async getFilmById(@Param('id') id: number) {
    return this.filmsService.getFilmById(id)
  }


  @ApiOperation({summary: 'Получить все фильмы'})
  @ApiResponse({ status: 200, type: [Film]})
  @ApiResponse({status: 404, description: 'Фильмы не найдены'})
  @Get()
  async getAllFilms(): Promise<Film[]> {
    return this.filmsService.getAllFilms()
  }

  @ApiOperation({ summary: 'Добавить актеров в фильм' })
  @ApiResponse({ status: 200, description: 'Актеры успешно добавлены' })
  @ApiResponse({status: 404, description: 'Фильм не найден'})
  @Post('add-actors-in-film')
  async addActorsInFilm(@Body() addActorsInFilmDto: AddActorsInFilmDto) {
    return this.filmsService.updateActorsInFilm(addActorsInFilmDto)
  }

  @ApiOperation({ summary: 'Удалить актеров из фильма' })
  @ApiResponse({ status: 200, type: String })
  @ApiResponse({status: 404, description: 'Фильм не найден'})
  @Delete('remove-actors-in-film')
  async removeActorsInFilm(@Body() addActorsInFilmDto: AddActorsInFilmDto) {
    return this.filmsService.updateActorsInFilm(addActorsInFilmDto, true)
  }

  @ApiOperation({ summary: 'Добавить жанры фильму' })
  @ApiResponse({ status: 200, type: String })
  @ApiResponse({status: 404, description: 'Фильм не найден'})
  @Post('add-genres-in-film')
  async addGenresInFilm(@Body() addGenresInFilmDto: AddGenresInFilmDto) {
    return this.filmsService.updateGenresInFilm(addGenresInFilmDto)
  }

  @ApiOperation({ summary: 'Удалить жанры фильма' })
  @ApiResponse({ status: 200, type: String })
  @ApiResponse({status: 404, description: 'Фильм не найден'})
  @Delete('remove-genres-in-film')
  async removeGenresInFilm(@Body() addGenresInFilmDto: AddGenresInFilmDto) {
    return this.filmsService.updateGenresInFilm(addGenresInFilmDto, true)
  }
}
