import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber } from "class-validator";

export class AddUserFilmDto {
  @ApiProperty({example: '1', description:'Id юзера'})
  @IsNumber({}, {message: 'Должно быть числом'})
  readonly userId: number;

  @ApiProperty({example: 1, description:'Id фильма/фильмов'})
  @IsNumber({}, {message: 'Должно быть числом'})
  readonly filmId: number;
}