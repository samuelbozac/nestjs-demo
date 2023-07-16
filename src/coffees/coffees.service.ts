import { Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
    private coffees: Coffee[] = [
        {
            id: 1,
            name: 'Shipwreck Roast',
            brand: 'Buddy Brew',
            flavors: ['chocolate', 'vanilla']
        },
    ];

    findAll(){
        return this.coffees;
    }

    findOne(id: number) {
        return this.coffees.find(item => item.id === id)
    }

    update(id: number, updateCoffeeDto: Coffee) {
        const coffeeIndex = this.coffees.findIndex(item => item.id === id);
        if (coffeeIndex >= 0){
            this.coffees[coffeeIndex] = updateCoffeeDto;
            return this.coffees
        }
    }

    create(createCoffeeDto: Coffee) {
        this.coffees.push(createCoffeeDto);
        return createCoffeeDto;
    }

    remove(id: number){
        const removedCoffee = this.findOne(id);
        this.coffees = this.coffees.filter((item) => item.id != id);
        return removedCoffee;
    }
}
