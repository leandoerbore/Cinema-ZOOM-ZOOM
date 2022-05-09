import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('Рендер страниц')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({summary: 'Главная страница сайта'})
  @Get()
  @Render('index')
  renderIndex() {
    return '';
  }

  @ApiOperation({summary: 'Страница каталога кино'})
  @Get('catalog')
  @Render('pages/Catalog')
  renderCatalog() {
    return '';
  }

  @ApiOperation({summary: 'Страница всех кинотеатров'})
  @Get('cinemas')
  @Render('pages/Cinemas')
  renderCinemas() {
    return '';
  }

  @ApiOperation({summary: 'Страница кино Джуманджи'})
  @Get('5')
  @Render('pages/JumanjiWelcomeToTheJungle')
  renderJumanjiWelcomeToTheJungle() {
    return '';
  }

  @ApiOperation({summary: 'Страница кино Дом монстр'})
  @Get('2')
  @Render('pages/MonsterHouse')
  renderMonsterHouse() {
    return '';
  }

  @ApiOperation({summary: 'Страница фильмов юзера'})
  @Get('my-films')
  @Render('pages/MyFilms')
  renderMyFilms() {
    return '';
  }

  @ApiOperation({summary: 'Страница кино Человек-Паук 2'})
  @Get('1')
  @Render('pages/SpiderMan2')
  renderSpiderMan2() {
    return '';
  }

  @ApiOperation({summary: 'Страница кино Веном(2018г)'})
  @Get('3')
  @Render('pages/Venom2018')
  renderVenom2018() {
    return '';
  }

  @Get('profile')
  @Render('pages/Profile')
  renderProfile(){
    return '';
  }
}
