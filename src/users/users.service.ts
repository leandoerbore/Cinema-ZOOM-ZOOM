import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { User } from './entities/user.entity';
import { AddUserDto } from "./DTO/add-user.dto";
import { UpdateUserDto } from "./DTO/update-user.dto";
import { AddUserFilmDto } from "./DTO/add-user-film.dto";
import { RolesService } from "../roles/roles.service";
import { UpdateUserRoleDto } from "./DTO/update-user-role.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private roleService: RolesService,
  ) {}

  async getUsers(): Promise<User[]> {
    const users =  await this.usersRepository.find({
      loadRelationIds: true,
    })

    if (users === undefined){
      throw new HttpException('Пользователи не найдены', HttpStatus.NOT_FOUND)
    }
    else{
      return users
    }
  }

  async getUser(id: number): Promise<User> {
    const user = await this.usersRepository.findOne(id, {
      loadRelationIds: true,
    })

    if (user === undefined){
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
    }
    else{
      return user
    }
  }

  async addUser(addUserDto: AddUserDto): Promise<User> {
    await this.usersRepository.insert(addUserDto)
      .catch(() => {
        throw new HttpException('Невозможно добавить данного пользователя', HttpStatus.BAD_REQUEST)
      })
    const user = await this.usersRepository.findOne({where: {
      email: addUserDto.email
      }})
    const role = await this.roleService.getRoleByValue('user')
    await this.usersRepository
      .createQueryBuilder()
      .relation(User, 'roles')
      .of(user.id)
      .add(role.id)
    return await this.usersRepository.findOne(user.id, {loadRelationIds: true,})
  }

  async updateUser(updateUserDto: UpdateUserDto, id: number): Promise<String> {
    const user = this.usersRepository.findOne(id)
    if (user === undefined){
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
    }
    await this.usersRepository.update(id, updateUserDto)
      .catch( () => {
        throw new HttpException('Невозможно обновить данные пользователя', HttpStatus.BAD_REQUEST)
      })
    return 'Updated';
  }

  async updateUserRole(updateUserRoleDto: UpdateUserRoleDto, remove=false): Promise<String> {
    const {userId, roleId} = updateUserRoleDto
    const user = await this.getUser(userId)

    remove
      ? await this.usersRepository
        .createQueryBuilder()
        .relation(User, 'roles')
        .of(userId)
        .remove(roleId)
        .catch(() => {
          throw new HttpException('Невозможно удалить роль у пользователя', HttpStatus.BAD_REQUEST)
        })
      : await this.usersRepository
        .createQueryBuilder()
        .relation(User, 'roles')
        .of(userId)
        .add(roleId)
        .catch(() => {
          throw new HttpException('Невозможно выдать роль пользователю', HttpStatus.BAD_REQUEST)
        })

    return 'Updated'
  }

  async deleteUser(id: number): Promise<String> {
    const user = await this.getUser(id)
      .catch(() => {
      throw new HttpException('Пользователя не существует', HttpStatus.BAD_REQUEST)
    })
    await this.usersRepository.delete(user.id);
    return 'Deleted';
  }

  async updateUserFilms(addUserFilmDto: AddUserFilmDto, remove) {
    const {userId, filmId} = addUserFilmDto
    const user = await this.getUser(userId)

    remove
      ? await this.usersRepository
        .createQueryBuilder()
        .relation(User, 'films')
        .of(userId)
        .remove(filmId)
        .catch( () => {
          throw new HttpException('Невозможно удалить фильм', HttpStatus.BAD_REQUEST)
        })
      : await this.usersRepository
        .createQueryBuilder()
        .relation(User, 'films')
        .of(userId)
        .add(filmId)
        .catch( () => {
          throw new HttpException('Невозможно добавить фильм', HttpStatus.BAD_REQUEST)
        })

    return 'Updated'
  }

  async getUserFilms(id: number) {
    const user = await this.getUser(id)
    const userFilms = user.films
    return userFilms
  }

  async getUserByEmail(email: string) {
    return  await this.usersRepository.findOne({where: {email: email,}, loadRelationIds: true})
  }
}
