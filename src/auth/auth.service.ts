import { Injectable, Logger, UnauthorizedException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
import { DataSource } from 'typeorm';
import { validate } from 'class-validator';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private readonly jwtService: JwtService,
        private readonly dataSource: DataSource
    ) { }

    async signUp(createUserDto: CreateUserDto): Promise<any> {
        try {
            const { email, password, isadmin } = createUserDto;
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = this.dataSource.getRepository(User).create({
                email,
                password: hashedPassword,
                isadmin
            });
            const savedUser = await this.dataSource.getRepository(User).save(user);
            // Generate JWT token
            const payload = { email: savedUser.email, sub: savedUser.id, isadmin: savedUser.isadmin };
            const token = this.jwtService.sign(payload);

            return {
                email: savedUser.email,
                isadmin: savedUser.isadmin,
                status: 'success',
                token
            };
        } catch (error) {
            this.logger.error(error);
            if (error.code === 'ER_DUP_ENTRY') { // MySQL duplicate entry error code
                return {
                    email: '',
                    isadmin: '',
                    status: 'failed',
                    message: 'User email already registered.'
                };
            }
            return {
                email: '',
                isadmin: '',
                status: 'failed',
                message: 'An error occurred'
            };
        }
    }

    async login(loginUser: LoginUserDto): Promise<any> {
        const errors = await validate(loginUser);
        if (errors.length > 0) {
            throw new BadRequestException('Validation failed');
        }

        const { email, password } = loginUser;
        const user = await this.dataSource.getRepository(User).findOne({ where: { email } });
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Generate JWT token
        const payload = { email: user.email, sub: user.id, isadmin: user.isadmin };
        const token = this.jwtService.sign(payload);

        return {
            email: user.email,
            isadmin: user.isadmin,
            status: 'success',
            token
        };
    }
}
