import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({
        description: 'The email of the user',
        example: 'user@example.com',  // Example in Swagger UI
        default: 'user@example.com',  // Default value in Swagger UI
    })
    readonly email: string;
    @ApiProperty({
        description: 'The password of the user',
        example: 'password123',   // Example in Swagger UI
        default: 'password123',   // Default value in Swagger UI
    })
    readonly password: string; // Plain password, to be hashed in service
    @ApiProperty({
        description: 'Admin',
        example: 'true',   // Example in Swagger UI
        default: 'true',   // Default value in Swagger UI
    })
    readonly isadmin: boolean;
}
