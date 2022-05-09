import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class AddActorsInFilmDto {
  @ApiProperty({example: '1', description:'Id фильма'})
  @IsNumber({}, {message: 'Должно быть числом'})
  readonly filmId: number;

  @ApiProperty({example: [1,2,5], description:'Id актеров'})
  @IsNumber({}, {message: 'Должно быть массивом чисел', each: true})
  readonly actorsId: number[];
}