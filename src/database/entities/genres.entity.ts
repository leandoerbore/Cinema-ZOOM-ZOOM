import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Film } from "../../films/entities/films.entity";
import { ApiProperty } from "@nestjs/swagger";
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

@Entity()
export class Genre {
  @ApiProperty({example: '1', description: 'Id жанра'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: 'Фантастика', description: 'Название жанра'})
  @Column({unique: true})
  title: string;

  @ApiModelProperty({
    type: type => Film,
    isArray: true
  })
  @ApiProperty({example: [1,2], description: 'Фильмы такого жанра'})
  @ManyToMany(() => Film, (film) => film.id)
  films: number[]
}