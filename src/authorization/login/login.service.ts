import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService, } from '@nestjs/jwt';
import { UserEntity } from 'src/_data/entities/user.entity';
import { LoginDto } from 'src/_data/dtos/login.dto';
import { TokenDto } from 'src/_data/dtos/token.dto';

@Injectable()
export class LoginService {

    constructor(
        @InjectRepository(UserEntity)
        private loginRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService
    ) { }

    async login(loginDto: LoginDto): Promise<TokenDto> {
        const entry = await this.loginRepository.findOne({
            email: loginDto.email.toLocaleLowerCase()
        });

        if (!entry || !await bcrypt.compare(loginDto.password, entry.password)) {
            throw new UnauthorizedException(`Login failed!`);
        }

        const jwtToken = this.issueJwtToken(entry.id);
        const refreshToken = this.issueRefreshToken(entry.id);

        return { jwt: jwtToken, refresh: refreshToken };
    }

    /**
     * the function refresh the jwt token 
     * preconditions:
     * - the existing jwt token should not have any errors other than the expired date
     * - the refresh token is valid 
     * - the user id of the refresh token exists in the database
     * unfulfilled requirements trigger a 401 error
     * a jwt token that has not yet expired will not be extended and will simply be returned!
     * 
     * @param jwtToken 
     * @param refreshToken 
     */
    async refreshToken(jwtToken, refreshToken): Promise<{jwt: string}> {
        let newToken = '';
        let hasErrors = false;
        try {
            // verify jwt token
            this.jwtService.verify(jwtToken, { secret: process.env.JWT_SECRET_KEY });
            console.error(`Info: The jwt token is not expired!`);
            newToken = jwtToken;
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                try {
                    // verify refresh token only when jwt token is expired and when refresh token is valid
                    const res = this.jwtService.verify(refreshToken, { secret: process.env.REFRESH_TOKEN_SECRET_KEY });
                    const userId = res?.userId;
                    if (userId > 0) {
                        // check if user exist in db
                        const entry = await this.loginRepository.findOne({ id: userId });
                        if (!entry) {
                            hasErrors = true;
                        }
                        // issue the new jwt token
                        newToken = this.issueJwtToken(userId);
                    } else {
                        console.error(`Error: The user with id = ${userId} no longer exists in the database!`);
                        hasErrors = true;
                    }
                } catch (err) {
                    console.error(`Error: The refresh token is not valid! ${err.name}`);
                    hasErrors = true;
                }
            } else {
                console.error(`Error: The error should be from type "TokenExpiredError" and not from type ${err.name}!`);
                hasErrors = true;
            }
        }

        if (hasErrors) {
            throw new UnauthorizedException();
        }

        return { jwt: newToken };
    }

    private issueJwtToken(userId: number): string {
        return this.jwtService.sign({ userId: userId });
    }

    private issueRefreshToken(userId: number): string {
        return this.jwtService.sign(
            { userId: userId },
            { secret: process.env.REFRESH_TOKEN_SECRET_KEY, expiresIn: Number(process.env.REFRESH_TOKEN_EXPIRATION) }
        );
    }
}
