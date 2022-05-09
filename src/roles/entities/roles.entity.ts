import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../users/entities/user.entity";
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

@Entity('roles')
export class Role {
  @ApiProperty({example: '1', description:'Уникальный идентификатор'})
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty({example: 'admin', description:'Название роли'})
  @Column({unique: true})
  title: string;

  @ApiModelProperty( {
    type: type => User,
    isArray: true
  })
  @ApiProperty({example: [1, 2], description: 'Юзеры с такой ролью (id юзеров)'})
  @ManyToMany(() => User, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  users: number[];
}