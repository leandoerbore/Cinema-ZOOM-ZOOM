import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from '../../users/entities/user.entity';
import { Producer } from "../../database/entities/producers.entity";
import { Genre } from "../../database/entities/genres.entity";
import { Actor } from "../../database/entities/actors.entity";
import { ApiProperty } from "@nestjs/swagger";
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import { IsDate } from "class-validator";


@Entity('films')
export class Film {
  @ApiProperty({example: '1', description:'Уникальный идентификатор'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: 'Spider-Man', description:'Название фильма'})
  @Column({ unique: true })
  title: string;

  @ApiProperty({example: 'https://url-picture', description: 'Ссылка на картинку фильма'})
  @Column({unique: true})
  img: string;

  @ApiProperty({example: '112', description: 'Длительность фильма'})
  @Column()
  time: number;

  @ApiProperty({example: 'США', description: 'Страна издания'})
  @Column()
  country: string;

  @ApiProperty({example: '04.02.2018', description: 'Дата премьеры в России'})
  @Column()
  premierDate: string;

  @ApiProperty({example: 'Волк серый воет фильм ', description: 'Описание фильма'})
  @Column()
  description: string;

  @ApiModelProperty( {
    type: type => Producer,
    isArray: false
  })
  @ApiProperty({example: 1, description: 'Продюсер фильма'})
  @ManyToOne(() => Producer, (producer) => producer.id)
  producer: number;

  @ApiModelProperty( {
    type: type => Genre,
    isArray: true
  })
  @ApiProperty({example: [1,2], description: 'Жанры фильма'})
  @ManyToMany(() => Genre, (genre) => genre.id, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'genresInFilm',
  })
  genres: number[];

  @ApiModelProperty( {
    type: type => Actor,
    isArray: true
  })
  @ApiProperty({example: [1,2], description: 'Актеры фильма'})
  @ManyToMany(() => Actor, (actor) => actor.id, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  @JoinTable( {
    name: 'actorsInFilm'
  })
  actors: number[];
}
