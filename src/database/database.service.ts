import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository } from 'typeorm';
import { Producer } from './entities/producers.entity';
import { Actor } from './entities/actors.entity';
import { Genre } from './entities/genres.entity';
import { AddGenreDto } from './DTO/add-genre.dto';
import { AddActorDto } from './DTO/add-actor.dto';
import { AddProducerDto } from "./DTO/add-producer.dto";
import { read } from "fs";


@Injectable()
export class DatabaseService {
  constructor(
    @InjectRepository(Producer)
    private producerRepository: Repository<Producer>,
    @InjectRepository(Actor)
    private actorRepository: Repository<Actor>,
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
  ) {}

  async addProducer(addProducerDto: AddProducerDto) {
    return await this.producerRepository.insert(addProducerDto)
      .catch( reason => {
        throw new HttpException(reason, HttpStatus.BAD_REQUEST)
      })
  }

  async addActor(addActorDto: AddActorDto): Promise<InsertResult> {
    return await this.actorRepository.insert(addActorDto)
      .catch(reason => {
      throw new HttpException(reason, HttpStatus.BAD_REQUEST)
    });
  }

  async addGenre(addGenreDto: AddGenreDto): Promise<InsertResult> {
    return await this.genreRepository.insert(addGenreDto)
      .catch(reason => {
      throw new HttpException(reason, HttpStatus.BAD_REQUEST)
    });
  }

  async removeProducer(id: number): Promise<DeleteResult> {
    return await this.producerRepository.delete(id)
      .catch(reason => {
        throw new HttpException(reason, HttpStatus.BAD_REQUEST)
      });
  }

  async removeActor(id: number): Promise<DeleteResult> {
    return await this.actorRepository.delete(id)
      .catch(reason => {
      throw new HttpException(reason, HttpStatus.BAD_REQUEST)
    });
  }

  async removeGenre(id: number): Promise<DeleteResult> {
    return await this.genreRepository.delete(id)
      .catch(reason => {
      throw new HttpException(reason, HttpStatus.BAD_REQUEST)
    });
  }

  async getProducerById(id: number): Promise<Producer> {
    const producer = await this.producerRepository.findOne(id)
      .catch(reason => {
      throw new HttpException(reason, HttpStatus.BAD_REQUEST)
    });
    if (producer === undefined){
      throw new HttpException('Режиссер не найден', HttpStatus.NOT_FOUND)
    }

    return producer
  }

  async getActorById(id: number): Promise<Actor> {
    const actor = await this.actorRepository.findOne(id)
      .catch(reason => {
        throw new HttpException(reason, HttpStatus.BAD_REQUEST)
      })
    if (actor === undefined){
      throw new HttpException('Актер не найден', HttpStatus.NOT_FOUND)
    }
    return actor
  }

  async getGenreById(id: number): Promise<Genre> {
    const genre =  await this.genreRepository.findOne(id)
      .catch( reason => {
        throw new HttpException(reason, HttpStatus.BAD_REQUEST)
      })
    if (genre === undefined){
      throw new HttpException('Жанр не найден', HttpStatus.NOT_FOUND)
    }

    return genre
  }

  async getAllProducers(): Promise<Producer[]> {
    const producers = await this.producerRepository.find()
      .catch(reason => {
        throw new HttpException(reason, HttpStatus.BAD_REQUEST)

      })
    if(producers === undefined){
      throw new HttpException('Режиссеры не найдены', HttpStatus.NOT_FOUND)
    }

    return producers
  }

  async getAllActors(): Promise<Actor[]> {
    const actors = await this.actorRepository.find()
      .catch(reason => {
        throw new HttpException(reason, HttpStatus.BAD_REQUEST)
      })
    if (actors === undefined){
      throw new HttpException('Актеры не найден', HttpStatus.NOT_FOUND)
    }
    return actors
  }

  async getAllGenres(): Promise<Genre[]> {
    const genres = await this.genreRepository.find()
      .catch(reason => {
        throw new HttpException(reason, HttpStatus.BAD_REQUEST)

      })
    if (genres === undefined){
      throw new HttpException('Актеры не найден', HttpStatus.NOT_FOUND)
    }
    return genres
  }
}
function User(User: any) {
  throw new Error('Function not implemented.');
}
