import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Order } from './order.entity';
import { GroceryItem } from './grocery.entity';

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, (order) => order.orderItems)
    order: Order;

    @ManyToOne(() => GroceryItem, (groceryItem) => groceryItem.id)
    groceryItem: GroceryItem;

    @Column('int')
    quantity: number;

    @Column('float')
    price: number;
}
