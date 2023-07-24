import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';

@Module({
  imports: [
    CoffeesModule,
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
      username: process.env.POSTGRES_USER,
      database: process.env.POSTGRES_DATABASE,
      password: process.env.POSTGRES_PASSWORD,
      autoLoadEntities: true, // models will be loaded automatically
      synchronize: true,
    }),
    CoffeeRatingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
