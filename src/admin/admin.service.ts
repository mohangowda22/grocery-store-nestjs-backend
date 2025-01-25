import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { GroceryItem } from '../entities/grocery.entity';
import { CreateGroceryDto } from '../dto/create-grocery.dto';

@Injectable()
export class AdminService {
    constructor(
        private readonly dataSource: DataSource
    ) { }

    getHello(): string {
        return 'Hello World!';
    }

    async addGrocery(createGroceryDto: CreateGroceryDto, user: any): Promise<GroceryItem> {
        if (!user.isadmin) {
            throw new UnauthorizedException('User is not an admin');
        }

        const groceryRepository = this.dataSource.getRepository(GroceryItem);
        const groceryItem = groceryRepository.create(createGroceryDto);
        return groceryRepository.save(groceryItem);
    }

    async getGrocery(user: any): Promise<GroceryItem[]> {
        if (!user.isadmin) {
            throw new UnauthorizedException('User is not an admin');
        }

        const groceryRepository = this.dataSource.getRepository(GroceryItem);
        return groceryRepository.find();
    }

    async updateGrocery(id: number, updateGroceryDto: Partial<CreateGroceryDto>, user: any): Promise<{ message: string }> {
        if (!user.isadmin) {
            throw new UnauthorizedException('User is not an admin');
        }

        const groceryRepository = this.dataSource.getRepository(GroceryItem);
        const groceryItem = await groceryRepository.findOneBy({ id });

        if (!groceryItem) {
            throw new NotFoundException('Grocery item not found');
        }

        await groceryRepository.update(id, updateGroceryDto);
        return { message: 'Grocery item updated successfully' };
    }

    async deleteGrocery(id: number, user: any): Promise<{ message: string }> {
        if (!user.isadmin) {
            throw new UnauthorizedException('User is not an admin');
        }

        const groceryRepository = this.dataSource.getRepository(GroceryItem);
        const groceryItem = await groceryRepository.findOneBy({ id });

        if (!groceryItem) {
            throw new NotFoundException('Grocery item not found');
        }

        await groceryRepository.delete(id);
        return { message: 'Grocery item removed successfully' };
    }

    async manageInventory(id: number, quantity: number, user: any): Promise<{ message: string }> {
        if (!user.isadmin) {
            throw new UnauthorizedException('User is not an admin');
        }

        const groceryRepository = this.dataSource.getRepository(GroceryItem);
        const groceryItem = await groceryRepository.findOneBy({ id });

        if (!groceryItem) {
            throw new NotFoundException('Grocery item not found');
        }

        groceryItem.quantity = quantity;
        await groceryRepository.save(groceryItem);
        return { message: 'Inventory updated successfully' };
    }
}
