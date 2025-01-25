import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
    @ApiProperty({
        description: 'The email of the user',
        example: 'user@example.com',  // Example in Swagger UI
        default: 'user@example.com',  // Default value in Swagger UI
    })
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @ApiProperty({
        description: 'The password of the user',
        example: 'password123',   // Example in Swagger UI
        default: 'password123',   // Default value in Swagger UI
    })
    @IsString()
    @IsNotEmpty()
    readonly password: string; // Plain password, to be hashed in service


}