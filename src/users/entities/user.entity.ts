import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Film } from '../../films/entities/films.entity';
import { ApiProperty } from "@nestjs/swagger";
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import { Role } from "../../roles/entities/roles.entity";

@Entity('users')
export class User {
  @ApiProperty({example: '1', description:'Уникальный идентификатор'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: 'pope@gmail.com', description:'Почта юзера'})
  @Column({ unique: true })
  email: string;

  @ApiProperty({example: 'pope', description:'Имя пользователя'})
  @Column()
  username: string;

  @ApiProperty({example: 'pope_lord', description:'Пароль пользователя'})
  @Column()
  password: string;


  @ApiModelProperty( {
    type: type => Film,
    isArray: true
  })
  @ApiProperty({example: [1, 2], description: 'Добавленные фильмы юзера (id фильмов)'})
  @ManyToMany(() => Film,  {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'user-films',
  })
  films: number[];

  @ApiModelProperty( {
    type: type => Role,
    isArray: true
  })
  @ApiProperty({example: [1, 2], description: 'Роли юзера (id ролей)'})
  @ManyToMany( () => Role, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinTable( {
    name: 'user-roles',
  })
  roles: number[];
}
