import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GroceryItem } from '../entities/grocery.entity';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('/grocery')
    @ApiOperation({ summary: 'View available grocery items' })
    @ApiResponse({ status: 200, description: 'Grocery items retrieved successfully' })
    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard)
    getAvailableGroceryItems(@Request() req): Promise<GroceryItem[]> {
        return this.userService.getAvailableGroceryItems();
    }

    @Post('/order')
    @ApiOperation({ summary: 'Book grocery items' })
    @ApiResponse({ status: 201, description: 'Order placed successfully' })
    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard)
    bookGroceryItems(@Body() orderDto: { items: { id: number, quantity: number }[] }, @Request() req): Promise<{ orderId: number, message: string }> {
        return this.userService.bookGroceryItems(orderDto, req.user);
    }
}
