import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Cinema {
  @ApiProperty({example: '1', description:'Id кинотеатра'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: 'Зверский', description:'Название кинотеатра'})
  @Column({unique: true})
  title: string;

  @ApiProperty({example: 'Ул. Победы д. 29', description: 'Адресс кинотеатра'})
  @Column({unique: true})
  address: string;
}