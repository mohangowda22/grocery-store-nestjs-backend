import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { GroceryItem } from '../entities/grocery.entity';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';

@Injectable()
export class UserService {
    constructor(
        private readonly dataSource: DataSource,
    ) { }

    async getAvailableGroceryItems(): Promise<GroceryItem[]> {
        const groceryRepository = this.dataSource.getRepository(GroceryItem);
        return groceryRepository.find();
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

        return { orderId: savedOrder.id, message: 'Order placed successfully' };
    }
}
