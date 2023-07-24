import { Injectable, Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { COFFEE_BRANDS } from './coffees.constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity';
import { DataSource } from 'typeorm';

// @Injectable()
// export class CoffeeBrandsFatory {
//   create() {
//     return ['buddy brew', 'nescafe'];
//   }
// }

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    // CoffeeBrandsFatory,
    {
      provide: COFFEE_BRANDS,
      useFactory: async (connection: DataSource): Promise<string[]> => {
        const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe']);
        return coffeeBrands;
      },
      inject: [DataSource],
    },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
