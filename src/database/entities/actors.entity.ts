import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Film } from "../../films/entities/films.entity";
import { ApiProperty } from "@nestjs/swagger";
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

@Entity()
export class Actor {
  @ApiProperty({example: '1', description:'Id актера'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: 'Тоби Магуайр', description:'Имя актера'})
  @Column({unique: true})
  name: string;

  @ApiModelProperty( {
    type: type => Film,
    isArray: true
  })
  @ApiProperty({example: [1, 2], description: 'Добавленные фильмы юзера (id фильмов)'})
  @ManyToMany(() => Film, (film) => film.id)
  films: number[];
}