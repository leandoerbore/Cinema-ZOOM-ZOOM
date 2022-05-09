import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { DatabaseService } from "./database.service";
import { DeleteResult, InsertResult } from "typeorm";
import { AddProducerDto } from "./DTO/add-producer.dto";
import { AddActorDto } from "./DTO/add-actor.dto";
import { AddGenreDto } from "./DTO/add-genre.dto";
import { Actor } from "./entities/actors.entity";
import { Producer } from "./entities/producers.entity";
import { Genre } from "./entities/genres.entity";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('База данных')
@Controller('database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  @ApiOperation({summary: 'Добавляет режиссера в бд'})
  @ApiResponse({status: 200, description: 'Режиссер успешно добавлен'})
  @ApiResponse({status: 400, description: 'Не удалось добавить режиссера'})
  @Post('add-producer')
  async addProducer(@Body() addProducerDto: AddProducerDto): Promise<InsertResult> {
    return await this.databaseService.addProducer(addProducerDto)
  }

  @ApiOperation({summary: 'Добавляет актера в бд'})
  @ApiResponse({status: 200, description: 'Актер успешно добавлен'})
  @ApiResponse({status: 400, description: 'Не удалось добавить актера'})
  @Post('add-actor')
  async addActor(@Body() addActorDto: AddActorDto): Promise<InsertResult> {
    return await this.databaseService.addActor(addActorDto)
  }

  @ApiOperation({summary: 'Добавляет жанр в бд'})
  @ApiResponse({status: 200, description: 'Жанр успешно добавлен'})
  @ApiResponse({status: 400, description: 'Не удалось добавить жанр'})
  @Post('add-genre')
  async addGenre(@Body() addGenreDto: AddGenreDto): Promise<InsertResult> {
    return await this.databaseService.addGenre(addGenreDto)
  }

  @ApiOperation({summary: 'Удаляет режиссера из бд'})
  @ApiResponse({status: 200, description: 'Режиссер успешно удален'})
  @ApiResponse({status: 400, description: 'Не удалось удалить режиссера'})
  @Delete('remove-producer/:id')
  async removeProducer(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return await this.databaseService.removeProducer(id)
  }

  @ApiOperation({summary: 'Удаляет актера из бд'})
  @ApiResponse({status: 200, description: 'Актер успешно удален'})
  @ApiResponse({status: 400, description: 'Не удалось удалить актера'})
  @Delete('remove-actor/:id')
  async removeActor(@Param('id') id: number): Promise<DeleteResult> {
    return await this.databaseService.removeActor(id)
  }

  @ApiOperation({summary: 'Удаляет жанр из бд'})
  @ApiResponse({status: 200, description: 'Жанр успешно удален'})
  @ApiResponse({status: 400, description: 'Не удалось удалить жанр'})
  @Delete('remove-genre/:id')
  async removeGenre(@Param('id') id: number): Promise<DeleteResult> {
    return await this.databaseService.removeGenre(id)
  }

  @ApiOperation({summary: 'Получить актера'})
  @ApiResponse({status: 200, description: 'Актер найден'})
  @ApiResponse({status: 404, description: 'Актер не найден'})
  @ApiResponse({status: 400, description: 'Не удалось получить актера'})
  @Get('get-actor-by-id/:id')
  async getActorById(@Param('id') id: number): Promise<Actor> {
    return await this.databaseService.getActorById(id)
  }

  @ApiOperation({summary: 'Получить режиссера'})
  @ApiResponse({status: 200, description: 'Режиссер найден'})
  @ApiResponse({status: 404, description: 'Режиссер не найден'})
  @ApiResponse({status: 400, description: 'Не удалось получить режиссера'})
  @Get('get-producer-by-id/:id')
  async getProducerById(@Param('id') id: number): Promise<Producer> {
    return await this.databaseService.getProducerById(id)
  }

  @ApiOperation({summary: 'Получить жанр'})
  @ApiResponse({status: 200, description: 'Жанр найден'})
  @ApiResponse({status: 404, description: 'Жанр не найден'})
  @ApiResponse({status: 400, description: 'Не удалось получить жанр'})
  @Get('get-genre-by-id/:id')
  async getGenreById(@Param('id') id: number): Promise<Genre> {
    return await this.databaseService.getGenreById(id)
  }

  @ApiOperation({summary: 'Получить всех актеров'})
  @ApiResponse({status: 200, type: [Actor], description: 'Актеры найдены'})
  @ApiResponse({status: 400, description: 'Не удалось получить актеров'})
  @ApiResponse({status: 404, description: 'Акетры не найдены'})
  @Get('get-all-actors')
  async getAllActors(): Promise<Actor[]> {
    return await this.databaseService.getAllActors()
  }

  @ApiOperation({summary: 'Получить всех режиссеров'})
  @ApiResponse({status: 200, type: [Actor], description: 'Режиссеры найдены'})
  @ApiResponse({status: 400, description: 'Не удалось получить режиссеров'})
  @ApiResponse({status: 404, description: 'Режиссеры не найдены'})
  @Get('get-all-producers')
  async getAllProducers(): Promise<Producer[]> {
    return await this.databaseService.getAllProducers()
  }

  @ApiOperation({summary: 'Получить все жанры'})
  @ApiResponse({status: 200, type: [Actor], description: 'Жанры найдены'})
  @ApiResponse({status: 400, description: 'Не удалось получить жанры'})
  @ApiResponse({status: 404, description: 'Жанры не найдены'})
  @Get('get-all-genres')
  async getAllGenres(): Promise<Genre[]> {
    return await this.databaseService.getAllGenres()
  }
}
