import { Controller, Post, Get, Put, Delete, Patch, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { CreateGroceryDto } from '../dto/create-grocery.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GroceryItem } from '../entities/grocery.entity';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Post('/grocery')
    @ApiOperation({ summary: 'Add a grocery item' })
    @ApiResponse({ status: 201, description: 'Grocery item added successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard)
    addGrocery(@Body() createGroceryDto: CreateGroceryDto, @Request() req): Promise<GroceryItem> {
        return this.adminService.addGrocery(createGroceryDto, req.user);
    }

    @Get('/grocery')
    @ApiOperation({ summary: 'Get all grocery items' })
    @ApiResponse({ status: 200, description: 'Grocery items retrieved successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard)
    getGrocery(@Request() req): Promise<GroceryItem[]> {
        return this.adminService.getGrocery(req.user);
    }

    @Put('/grocery/:id')
    @ApiOperation({ summary: 'Update a grocery item' })
    @ApiResponse({ status: 200, description: 'Grocery item updated successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard)
    updateGrocery(@Param('id') id: number, @Body() updateGroceryDto: Partial<CreateGroceryDto>, @Request() req): Promise<{ message: string }> {
        return this.adminService.updateGrocery(id, updateGroceryDto, req.user);
    }

    @Delete('/grocery/:id')
    @ApiOperation({ summary: 'Delete a grocery item' })
    @ApiResponse({ status: 200, description: 'Grocery item removed successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard)
    deleteGrocery(@Param('id') id: number, @Request() req): Promise<{ message: string }> {
        return this.adminService.deleteGrocery(id, req.user);
    }

    @Patch('/grocery/:id/inventory')
    @ApiOperation({ summary: 'Manage inventory levels of a grocery item' })
    @ApiResponse({ status: 200, description: 'Inventory updated successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard)
    manageInventory(@Param('id') id: number, @Body('quantity') quantity: number, @Request() req): Promise<{ message: string }> {
        return this.adminService.manageInventory(id, quantity, req.user);
    }
}
