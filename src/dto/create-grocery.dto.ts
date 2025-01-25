import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGroceryDto {
    @ApiProperty({ example: 'Apple', description: 'The name of the grocery item' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 1.99, description: 'The price of the grocery item' })
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @ApiProperty({ example: 100, description: 'The quantity of the grocery item' })
    @IsNumber()
    @IsNotEmpty()
    quantity: number;
}