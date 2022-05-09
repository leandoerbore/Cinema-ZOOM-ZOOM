import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsString, IsUrl } from "class-validator";
import { Column } from "typeorm";

export class AddFilmDto {
  @ApiProperty({example: 'Spider-Man', description:'Название фильма'})
  @IsString({message:'Должно быть строковым значением'})
  readonly title: string;

  /*@ApiProperty({example: 'Сэм Рейми', description:'Продюсер фильма'})
  @IsNumber({}, {message: 'Должно быть числом'})
  readonly producer: number;*/

  @ApiProperty({example: 'https://url-picture', description:'Ссылка на картинку фильма'})
  @IsUrl({message: 'Должно быть ссылкой на картинку'})
  readonly img: string;

  @ApiProperty({example: '112', description: 'Длительность фильма'})
  @IsNumber({},{message: 'Должно быть числом'})
  readonly time: number;

  @ApiProperty({example: 'USA', description:'Страна издания'})
  @IsString({message: 'Должно быть строковым значением'})
  readonly country: string;

  @ApiProperty({example: ' 21 декабря 2017', description: 'Дата премьеры в России'})
  @IsString({message:'Должно быть строковым значением'})
  readonly premierDate: string;

  @ApiProperty({example: 'Волк серый воет фильм ', description: 'Описание фильма'})
  @IsString({message:'Должно быть строковым значением'})
  readonly description: string;

  @IsNumber({},{message: 'Должно быть числом'})
  readonly producerId: number;
}