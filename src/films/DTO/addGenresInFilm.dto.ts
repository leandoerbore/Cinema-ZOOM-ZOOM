import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class AddGenresInFilmDto {
  @ApiProperty({example: '1', description:'Id фильма'})
  @IsNumber({}, {message: 'Должно быть числом'})
  readonly filmId: number;

  @ApiProperty({example: [1,2,5], description:'Id жанров'})
 /* @IsNumber({}, {message: 'Должно быть массивом чисел', each: true})*/
  readonly genreId: number;
}