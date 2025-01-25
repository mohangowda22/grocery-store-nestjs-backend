import { Order } from 'src/entities/order.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string; // Hashed password

    @Column()
    isadmin: boolean; // Hashed password

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];
}
