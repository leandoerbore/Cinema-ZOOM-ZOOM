import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from './entities/films.entity';
import { AddFilmDto } from './DTO/add-film.dto';
import { AddActorsInFilmDto } from './DTO/addActorsInFilm.dto';
import { AddGenresInFilmDto } from './DTO/addGenresInFilm.dto';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film)
    private filmsRepository: Repository<Film>,
  ) {}

  async addFilm(addFilmDto: AddFilmDto) {
    await this.filmsRepository.insert(addFilmDto)
      .catch( (reason) => {
        throw new HttpException(reason, HttpStatus.BAD_REQUEST)
      });
    return 'Added';
  }

  async deleteFilm(id: number) {
    await this.filmsRepository.delete(id)
      .catch(() => {
        throw new HttpException('Не удалось удалить фильм из бд', HttpStatus.BAD_REQUEST)
      });
    return 'Deleted';
  }

  async getFilmById(id: number): Promise<Film> {
    const film = await this.filmsRepository.findOne(id, {
      loadRelationIds: true,
    });
    if (film === undefined){
      throw new HttpException('Фильм не найден', HttpStatus.NOT_FOUND)
    }

    return film
  }

  async getAllFilms(): Promise<Film[]> {
    const films =  await this.filmsRepository.find({
      loadRelationIds: true,
    })
    if (films === undefined){
      throw new HttpException('Фильмы не найдены', HttpStatus.NOT_FOUND)
    }

    return films
  }

  async updateActorsInFilm(
    addActorsInFilmDto: AddActorsInFilmDto,
    remove = false,
  ) {
    const { filmId, actorsId } = addActorsInFilmDto;
    const film = await this.getFilmById(filmId)

    for (const actorId of actorsId) {
      remove
        ? await this.filmsRepository
            .createQueryBuilder()
            .relation(Film, 'actors')
            .of(filmId)
            .remove(actorId)
        : await this.filmsRepository
            .createQueryBuilder()
            .relation(Film, 'actors')
            .of(filmId)
            .add(actorId);
    }

    return 'Updated';
  }

  async updateGenresInFilm(
    addGenresInFilmDto: AddGenresInFilmDto,
    remove = false,
  ) {
    const { filmId, genreId } = addGenresInFilmDto;
    const film = await this.getFilmById(filmId)

    remove
      ? await this.filmsRepository
        .createQueryBuilder()
        .relation(Film, 'genres')
        .of(filmId)
        .remove(genreId)
      : await this.filmsRepository
        .createQueryBuilder()
        .relation(Film, 'genres')
        .of(filmId)
        .add(genreId);

    /*for (const genreId of genresId) {
      remove
        ? await this.filmsRepository
            .createQueryBuilder()
            .relation(Film, 'genres')
            .of(filmId)
            .remove(genreId)
        : await this.filmsRepository
            .createQueryBuilder()
            .relation(Film, 'genres')
            .of(filmId)
            .add(genreId);
    }*/

    return 'Updated';
  }
}
