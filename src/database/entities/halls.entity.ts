import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Hall {
  @ApiProperty({example: 1, description: 'Id зала'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: 'Большевик', description: 'Название зала'})
  @Column({unique: true})
  title: string;
}