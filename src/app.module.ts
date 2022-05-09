import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmsModule } from './films/films.module';
import { ServerTimeInterceptor } from './server-time-interceptor/server-time.interceptor';
import { DatabaseModule } from "./database/database.module";
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: '.env'}),
    UsersModule,
    FilmsModule,
    DatabaseModule,
    RolesModule,
    RolesModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      ssl: {
        rejectUnauthorized: false,
      },
      host: process.env.POSTGRES_HOST,
      port: 5432,
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: ['dist/**/entities/*.entities{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
      migrationsTableName: "films",
      migrations: ["migration/*.ts"],
      cli: {
        migrationsDir: "migration"
      }
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ServerTimeInterceptor,
    },
  ],
})
export class AppModule {}
