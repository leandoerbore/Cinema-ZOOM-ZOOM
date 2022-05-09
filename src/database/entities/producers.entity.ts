import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Film } from "../../films/entities/films.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Producer {
  @ApiProperty({example: 1, description: 'Id режиссера'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: 'Чехов А.З.', description: 'Имя режиссера'})
  @Column({ unique: true})
  name: string;
}