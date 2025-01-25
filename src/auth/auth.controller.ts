import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../dto/login-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/login')
    @ApiOperation({ summary: 'User login' })
    @ApiResponse({ status: 200, description: 'Login successful' })
    @ApiResponse({ status: 401, description: 'Invalid credentials' })
    @ApiBody({ type: LoginUserDto })
    login(@Body() loginUser: LoginUserDto): any {
        return this.authService.login(loginUser);
    }

    @Post('/signUp')
    @ApiOperation({ summary: 'User sign up' })
    @ApiResponse({ status: 201, description: 'User registered successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiBody({ type: CreateUserDto })
    signUp(@Body() createUserDto: CreateUserDto): any {
        return this.authService.signUp(createUserDto);
    }
}
