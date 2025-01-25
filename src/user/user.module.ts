import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { GroceryItem } from '../entities/grocery.entity';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';

@Module({
    imports: [TypeOrmModule.forFeature([GroceryItem, Order, OrderItem])],
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule { }
