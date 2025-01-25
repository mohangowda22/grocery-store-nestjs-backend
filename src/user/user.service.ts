import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { DataSource } from 'typeorm';
import { GroceryItem } from '../entities/grocery.entity';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { Cache } from 'cache-manager';

@Injectable()
export class UserService {
    constructor(
        private readonly dataSource: DataSource,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) { }

    async getAvailableGroceryItems(): Promise<GroceryItem[]> {
        const cachedItems = await this.cacheManager.get<GroceryItem[]>('groceryItems');
        if (cachedItems) {
            return cachedItems;
        }

        const groceryRepository = this.dataSource.getRepository(GroceryItem);
        const items = await groceryRepository.find();
        await this.cacheManager.set('groceryItems', items, 600);
        return items;
    }

    async bookGroceryItems(orderDto: { items: { id: number, quantity: number }[] }, user: any): Promise<{ orderId: number, message: string }> {
        const groceryRepository = this.dataSource.getRepository(GroceryItem);
        const orderRepository = this.dataSource.getRepository(Order);
        const orderItemRepository = this.dataSource.getRepository(OrderItem);

        const order = new Order();
        order.user = user;
        const savedOrder = await orderRepository.save(order);

        for (const item of orderDto.items) {
            const groceryItem = await groceryRepository.findOneBy({ id: item.id });
            if (!groceryItem) {
                throw new NotFoundException(`Grocery item with id ${item.id} not found`);
            }
            if (groceryItem.quantity < item.quantity) {
                throw new BadRequestException(`Insufficient quantity for item ${groceryItem.name}`);
            }

            groceryItem.quantity -= item.quantity;
            await groceryRepository.save(groceryItem);

            const orderItem = new OrderItem();
            orderItem.order = savedOrder;
            orderItem.groceryItem = groceryItem;
            orderItem.quantity = item.quantity;
            await orderItemRepository.save(orderItem);
        }

        await this.cacheManager.del('groceryItems'); // Invalidate cache
        return { orderId: savedOrder.id, message: 'Order placed successfully' };
    }
}
