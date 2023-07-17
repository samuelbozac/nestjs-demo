import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}

  findAll() {
    return this.coffeeRepository.find();
  }

  findOne(id: number) {
    const coffee = this.coffeeRepository.findOne({ where: { id: id } });
    if (!coffee) {
      throw new NotFoundException(`Coffe #${id} not found`);
    }
    return coffee;
  }

  async update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    const coffee = await this.coffeeRepository.preload({
        id: id,
        ...updateCoffeeDto
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return this.coffeeRepository.save(coffee);
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    const coffee = this.coffeeRepository.create(createCoffeeDto);
    return this.coffeeRepository.save(coffee);
  }

  async remove(id: number) {
    const removedCoffee = await this.findOne(id);
    return this.coffeeRepository.remove(removedCoffee);
  }
}
